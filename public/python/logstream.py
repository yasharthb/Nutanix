from multiprocessing import Pool
import os
import sys
import time
filedic=[]
# keep_phrases = sys.argv[1]
# keep_phrases = keep_phrases.split(";")

def logger(infile) :
    f=open(infile)
    while 1:
        where = f.tell()
        line = f.readline()
        if not line:
            time.sleep(0.01)
            f.seek(where)
        else:
            print (line[:-1],file=open("public/data/myfile.txt", "a"))
for subdir, dirs, files in os.walk("../data/log_simulator/"):
    for file in files:
        #print os.path.join(subdir, file)
        filepath = subdir + os.sep + file

        if filepath.endswith(".log"):
        	filedic.append(filepath)

p=Pool(len(filedic))
p.map(logger,filedic)