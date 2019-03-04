from multiprocessing import Pool
import os

filedic=[]
keep_phrases =['DBG','ERROR','INFO']
cdbg=0
cerr=0
cinfo=0
def logger(infile) :
    with open(infile) as f:
		f = f.readlines()
    for line in f:
        if keep_phrases[0] in line:
            cdbg=cdbg+1
        elif keep_phrases[1] in line:
            cerr=cerr+1
        elif keep_phrases[2] in line:
            cinfo=cinfo+1
print (cdbg)
print(cerr)
print(cinfo)
for subdir, dirs, files in os.walk("./public/data/log_simulator/"):
    for file in files:
        #print os.path.join(subdir, file)
        filepath = subdir + os.sep + file

        if filepath.endswith(".log"):
        	filedic.append(filepath)

p=Pool(len(filedic))
p.map(logger,filedic)
