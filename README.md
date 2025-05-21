ArrayCat (https://arraycat.com/) is a lightweight, privacy-first, tool for converting a list or string into an array, list or SQL insert query, with a support of transforming the data during the process.

For example:

Input Data Type: Comma separated.  
Input Data: Apple,Banana,Grapefruit,Orange,Durian,Pear,Yellow plum,Açaí  
Output Data Type: JavaScript Array  
Transformations: Remove diacritics, Sort  
Output: ["Acai", "Apple", "Banana", "Durian", "Grapefruit", "Orange", "Pear", "Yellow plum"];  

Input Data Type: Comma separated.  
Input Data: Apple,Banana,Banana,,apple,kiwi,banana  
Output Data Type: PHP Array  
Transformations: Convert to lower case, count duplicate elements, sort, remove empty elements  
Output: array("2:apple", "3:banana", "1:kiwi");
