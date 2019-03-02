from multiprocessing import Pool
from termcolor import colored
import os
import tailer

filedic=[]
keep_phrases = raw_input("Enter string:")
keep_phrases = keep_phrases.split(";")

def livelogger(infile) :
    for line in tailer.follow(open(infile)):
        for phrase in keep_phrases:
            if phrase in line:
                print colored(line,'green')
            else :
                print line
for subdir, dirs, files in os.walk("/home/yasharth/Download_Temp/log_simulator/"):
    for file in files:
        #print os.path.join(subdir, file)
        filepath = subdir + os.sep + file

        if filepath.endswith(".log"):
        	filedic.append(filepath)

p=Pool(len(filedic))
p.map(livelogger,filedic)