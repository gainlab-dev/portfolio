import re
import os

html_path = r"C:\Users\Usama\.gemini\antigravity\brain\b542f441-7719-44a8-b041-9475f8bea208\.system_generated\steps\824\content.md"

if os.path.exists(html_path):
    with open(html_path, 'r', encoding='utf-8') as f:
        text = f.read()
    
    # find src="..."
    src_urls = re.findall(r'src="([^"]+)"', text)
    # find href="..." ending in common image extensions or containing images
    href_urls = re.findall(r'href="([^"]+\.(?:png|jpe?g|webp|gif|svg))"', text)
    # find meta property="og:image" content="..."
    og_images = re.findall(r'content="([^"]+\.(?:png|jpe?g|webp|gif|svg))"', text)
    
    all_urls = set(src_urls + href_urls + og_images)
    print("Found URLs:")
    for url in sorted(all_urls):
        print(url)
else:
    print("File not found:", html_path)
