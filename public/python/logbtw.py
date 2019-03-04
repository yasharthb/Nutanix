from multiprocessing import Pool
import os
import re
import sys
from datetime import datetime

keep_phrases = sys.argv[1]
keep_phrases= keep_phrases.split(";")
reg1='%Y-%m-%d %H:%M:%S.%f'
reg2='%Y-%m-%d %H:%M:%S'
start_time = datetime.strptime(keep_phrases[0], '%Y-%m-%d %H:%M:%S.%f')
end_time = datetime.strptime(keep_phrases[1], '%Y-%m-%d %H:%M:%S.%f')

filedic=[]

def logger(infile) :
    check=False
    with open(infile) as f:
        f = f.readlines()
    for line in f:
        if line[0]=='2' :
            line_split=line.split(" ")
            if line[19]=='.' :
                time_obj=datetime.strptime(line_split[0]+' '+line_split[1], reg1)
            else:
                time_obj=datetime.strptime(line_split[0]+' '+line_split[1], reg2)
            if time_obj>=start_time and time_obj<=end_time :
                print(line[:-1])
                check=True
            else :
                check=False
        else :
            if check :
                print(line[:-1])
                continue
for subdir, dirs, files in os.walk("./public/data/log_simulator/"):
    for file in files:
        #print os.path.join(subdir, file)
        filepath = subdir + os.sep + file

        if filepath.endswith(".log"):
            filedic.append(filepath)

p=Pool(len(filedic))
p.map(logger,filedic)