import sys
import pickle as pk
model=pk.load(open("model.mod","rb"))
Vect=pk.load(open("vect.mod","rb"))
Y=model.predict(Vect.transform([" ".join(sys.argv[1:])]))
print(Y)
sys.stdout.flush()