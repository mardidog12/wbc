#!/bin/bash
for file in ./*_??_*; do
    dir=${file%_*}
    dir=${dir##*_}
    mkdir -p "./$dir" &&
    mv -iv "$file" "./$dir"
done
