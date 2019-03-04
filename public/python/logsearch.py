from multiprocessing import Pool
import os

filedic=[]
keep_phrases = raw_input("Enter string:")
keep_phrases = keep_phrases.split(";")

def logger(infile) :
    with open(infile) as f:
        f = f.readlines()
    for line in f:
        for phrase in keep_phrases:
            if phrase in line:
                print line[:-1]
                break
for subdir, dirs, files in os.walk("./public/data/log_simulator/"):
    for file in files:
        #print os.path.join(subdir, file)
        filepath = subdir + os.sep + file

        if filepath.endswith(".log"):
        	filedic.append(filepath)

p=Pool(len(filedic))
p.map(logger,filedic)