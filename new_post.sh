#!/bin/bash

# Function to slugify a string
slugify() {
    echo "$1" | iconv -t ascii//TRANSLIT | tr -cd '[:alnum:][:space:]' | tr ' ' '-' | tr -s '-'
}

# Get the current date and time in the specified format
current_datetime=$(TZ=America/New_York date +"%Y-%m-%d-%H-%M-%S")

posts_dir="content/posts"

# Prompt the user to enter the name
read -p "Enter the name of the post: " name

if [ -n "$name" ]; then
    slugified_name=$(slugify "$name")
    filename="${current_datetime}-${slugified_name}.md"
    printf "# %s\n\n" "$name" > "$posts_dir/$filename"
else
    filename="${current_datetime}.md"
    touch "$posts_dir/$filename"
fi

echo "File created: $filename"
nvim "+norm Go" "+startinsert" "$posts_dir/$filename"
