#!/bin/bash

i=1
for file in "WhatsApp Image"*; do
  extension="${file##*.}"
  new_name="gallery-image-$i.$extension"
  mv "$file" "$new_name"
  i=$((i+1))
done
