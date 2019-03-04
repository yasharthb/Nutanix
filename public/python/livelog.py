from multiprocessing import Pool
# from termcolor import colored, cprint
import os
import tailer
import sys
filedic=[]
keep_phrases = sys.argv[1]
keep_phrases = keep_phrases.split(";")

def livelogger(infile) :
    for line in tailer.follow(open(infile)):
        for phrase in keep_phrases:
            # if phrase in line:
            #     cprint(line, 'green', 'on_red')
            # else :
            print (line)
for subdir, dirs, files in os.walk("./public/data/log_simulator/"):
    for file in files:
        #print os.path.join(subdir, file)
        filepath = subdir + os.sep + file

        if filepath.endswith(".log"):
        	filedic.append(filepath)

p=Pool(len(filedic))
p.map(livelogger,filedic)