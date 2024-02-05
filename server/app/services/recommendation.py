from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer
from sklearn.neighbors import NearestNeighbors
from sklearn.cluster import KMeans
from sklearn.metrics import adjusted_rand_score
import pickle
from pathlib import Path

BASE_DIR = Path(__file__).resolve(strict=True).parent

vectorizer = TfidfVectorizer(stop_words='english')


with open(f"{BASE_DIR}/similarity.pkl", "rb") as f:
     data = pickle.load(f)
     
with open(f"{BASE_DIR}/image_names.pkl", "rb") as f:
     pic_names = pickle.load(f)
     
with open(f"{BASE_DIR}/files.pkl", "rb") as f:
     files = pickle.load(f)



def get_recommendation(images):
     rec=[]
     index=pic_names.index(images)
     info=data[files[index]].sort_values(ascending=False)[0:6].index
     for inf in info: 
         rec.append(pic_names[int(inf)])
     return rec


     