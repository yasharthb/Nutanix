import os

keep_phrases = raw_input("Enter string:")
keep_phrases = keep_phrases.split(" ")
# keep_phrases = ["DBG",
#               "ERROR"]
for subdir, dirs, files in os.walk("../data/log_simulator/"):
    for file in files:
        #print os.path.join(subdir, file)
        filepath = subdir + os.sep + file

        if filepath.endswith(".log"):
            important = []
            infile = filepath
            with open(infile) as f:
    			f = f.readlines()
            for line in f:
                for phrase in keep_phrases:
                    if phrase in line:
                        important.append(line)
                        break
            print ''.join(important)