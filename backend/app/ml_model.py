import math
import pandas as pd
import numpy as np
from collections import Counter

from .data import load_city_services_data


# ----------------------------
# Load and prepare data
# ----------------------------
df = load_city_services_data()

if df.empty:
    raise ValueError("City services dataset is empty")

df["combined_features"] = (
    df["category"].fillna("") + " " +
    df["location"].fillna("")
).str.lower()


# ----------------------------
# Simple tokenizer
# ----------------------------
def tokenize(text: str):
    return [word for word in text.split() if len(word) > 2]


# ----------------------------
# Build vocabulary
# ----------------------------
documents = df["combined_features"].tolist()
tokenized_docs = [tokenize(doc) for doc in documents]

vocab = sorted(set(word for doc in tokenized_docs for word in doc))
vocab_index = {word: i for i, word in enumerate(vocab)}


# ----------------------------
# TF-IDF implementation
# ----------------------------
def compute_tf(doc_tokens):
    counts = Counter(doc_tokens)
    total = len(doc_tokens)
    return {word: count / total for word, count in counts.items()}


def compute_idf(docs):
    N = len(docs)
    idf = {}
    for word in vocab:
        containing = sum(1 for doc in docs if word in doc)
        idf[word] = math.log((N + 1) / (containing + 1)) + 1
    return idf


idf_scores = compute_idf(tokenized_docs)


def compute_tfidf_vector(doc_tokens):
    tf = compute_tf(doc_tokens)
    vector = np.zeros(len(vocab))
    for word, tf_value in tf.items():
        if word in vocab_index:
            vector[vocab_index[word]] = tf_value * idf_scores[word]
    return vector


# Precompute document vectors
doc_vectors = np.array([compute_tfidf_vector(doc) for doc in tokenized_docs])


# ----------------------------
# Cosine similarity
# ----------------------------
def cosine_similarity(vec1, vec2):
    norm1 = np.linalg.norm(vec1)
    norm2 = np.linalg.norm(vec2)
    if norm1 == 0 or norm2 == 0:
        return 0.0
    return float(np.dot(vec1, vec2) / (norm1 * norm2))


# ----------------------------
# Recommendation function
# ----------------------------
def hybrid_recommendation(user_preference: str, user_location: str) -> str:
    user_input = f"{user_preference} {user_location}".lower()
    user_tokens = tokenize(user_input)
    user_vector = compute_tfidf_vector(user_tokens)

    similarities = [
        cosine_similarity(user_vector, doc_vec)
        for doc_vec in doc_vectors
    ]

    best_match_index = int(np.argmax(similarities))
    return str(df.iloc[best_match_index]["service_name"])
