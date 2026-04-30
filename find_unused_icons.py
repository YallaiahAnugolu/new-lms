import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Extract the lucide-react imports
lucide_imports_match = re.search(r"import\s+\{([^}]+)\}\s+from\s+'lucide-react'", content)
if lucide_imports_match:
    icons_str = lucide_imports_match.group(1)
    icons = [icon.strip() for icon in icons_str.split(',') if icon.strip()]
    
    unused = []
    for icon in icons:
        # Check if the icon is used as a component <Icon or referenced like icon: Icon
        # A simple check: count occurrences of the icon name. It should be > 1 (1 for the import)
        # Note: some icons might be substrings of others, but usually they are distinct.
        count = len(re.findall(r'\b' + icon + r'\b', content))
        if count <= 1:
            unused.append(icon)
            
    print("Unused icons:", unused)
else:
    print("No lucide-react imports found.")
