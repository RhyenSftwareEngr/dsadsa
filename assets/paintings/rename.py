import glob
import os
import re
import csv

painting_titles = {}

paintings = {}
for f in glob.glob("assets/paintings/painting*.png"):
    p_index = re.search(r"\d+(?=\W)", f).group()
    splitted = f.split("\\")
    os.rename(f, splitted[0] + "\\" + p_index+".png")