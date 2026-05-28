import re
import os

html_path = r"C:\Users\Usama\.gemini\antigravity\brain\b542f441-7719-44a8-b041-9475f8bea208\.system_generated\steps\824\content.md"

if os.path.exists(html_path):
    with open(html_path, 'r', encoding='utf-8') as f:
        text = f.read()
    
    # find anything ending in .png, .jpg, .jpeg, .svg, .webp, .mp4, .gif
    matches = re.findall(r'[\w\-\/\.]+\.(?:png|jpg|jpeg|svg|webp|mp4|gif)[a-zA-Z0-9\?\=\&\-\_]*', text)
    print("Found assets:")
    for match in sorted(set(matches)):
        print(match)
else:
    print("File not found")
