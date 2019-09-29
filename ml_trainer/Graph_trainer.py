# MODEL TRAINING GRAPH PREDICTION

# CREATING DATASET
import pandas as pd
data=pd.read_excel("Graph_training_set.xlsx")
X=data.Inputs
Y=data.Graph

# VECTORIZATION OF TEXT (INPUT)
from sklearn.feature_extraction.text import CountVectorizer
Vect=CountVectorizer().fit(X)
X_vect=Vect.transform(X)

# MODEL TRAINING
from sklearn.tree import DecisionTreeClassifier
model=DecisionTreeClassifier(criterion="entropy")
model.fit(X_vect,Y)

# MODEL BYTE CONVERSION(OPTIONAL)
import pickle as pk
pk.dump(model,open("../model.mod","wb"))
pk.dump(Vect,open("../vect.mod","wb"))

