const PDFDocument = require('pdfkit');
const fs = require('fs');

const doc = new PDFDocument();
const outputPath = 'CoalIndia_MCQs_Cleaned.pdf';
doc.pipe(fs.createWriteStream(outputPath));

doc.fontSize(20).text('Coal India Online Computer Test - 100 MCQs', { align: 'center' });
doc.moveDown(2);

const mcqs = [
  { q: "1. Where is the headquarters of Coal India Limited (CIL) located?", a: "A) New Delhi", b: "B) Kolkata", c: "C) Dhanbad", d: "D) Ranchi", ans: "Answer: B" },
  { q: "2. In which year was Coal India Limited granted the 'Maharatna' status?", a: "A) 2008", b: "B) 2010", c: "C) 2011", d: "D) 2013", ans: "Answer: C" },
  { q: "3. Which state in India has the largest coal reserves?", a: "A) Odisha", b: "B) Chhattisgarh", c: "C) Jharkhand", d: "D) West Bengal", ans: "Answer: C" },
  { q: "4. What is the rank of India in the world in terms of total coal production?", a: "A) First", b: "B) Second", c: "C) Third", d: "D) Fourth", ans: "Answer: B" },
  { q: "5. Which type of coal is considered the highest quality with the highest carbon content?", a: "A) Lignite", b: "B) Bituminous", c: "C) Peat", d: "D) Anthracite", ans: "Answer: D" },
  { q: "6. The 'World Environment Day' is celebrated every year on:", a: "A) June 5", b: "B) July 11", c: "C) September 16", d: "D) April 22", ans: "Answer: A" },
  { q: "7. Who was the first Governor-General of independent India?", a: "A) Lord Mountbatten", b: "B) C. Rajagopalachari", c: "C) Dr. Rajendra Prasad", d: "D) Sardar Patel", ans: "Answer: A" },
  { q: "8. The Kuchipudi dance form originated in which Indian state?", a: "A) Tamil Nadu", b: "B) Kerala", c: "C) Andhra Pradesh", d: "D) Karnataka", ans: "Answer: C" },
  { q: "9. Which planet is known as the 'Red Planet'?", a: "A) Venus", b: "B) Mars", c: "C) Jupiter", d: "D) Saturn", ans: "Answer: B" },
  { q: "10. The fundamental duties are mentioned in which part of the Indian Constitution?", a: "A) Part III", b: "B) Part IV-A", c: "C) Part V", d: "D) Part VI", ans: "Answer: B" },
  { q: "11. What is the currency of Japan?", a: "A) Won", b: "B) Yuan", c: "C) Yen", d: "D) Ringgit", ans: "Answer: C" },
  { q: "12. Which enzyme is responsible for the digestion of protein in the human body?", a: "A) Amylase", b: "B) Lipase", c: "C) Pepsin", d: "D) Trypsin", ans: "Answer: C" },
  { q: "13. The 'Silent Valley National Park' is located in which state?", a: "A) Uttarakhand", b: "B) Kerala", c: "C) Himachal Pradesh", d: "D) Assam", ans: "Answer: B" },
  { q: "14. Who is the author of the book 'Wings of Fire'?", a: "A) V.S. Naipaul", b: "B) A.P.J. Abdul Kalam", c: "C) Arundhati Roy", d: "D) Vikram Seth", ans: "Answer: B" },
  { q: "15. In which year did the First Battle of Panipat take place?", a: "A) 1526", b: "B) 1556", c: "C) 1761", d: "D) 1576", ans: "Answer: A" },
  { q: "16. Which Indian city is known as the 'Coal Capital of India'?", a: "A) Singrauli", b: "B) Dhanbad", c: "C) Asansol", d: "D) Korba", ans: "Answer: B" },
  { q: "17. The Nobel Prize for Peace is awarded in which city?", a: "A) Stockholm", b: "B) Oslo", c: "C) Geneva", d: "D) New York", ans: "Answer: B" },
  { q: "18. What is the chemical symbol for Gold?", a: "A) Ag", b: "B) Au", c: "C) Pt", d: "D) Fe", ans: "Answer: B" },
  { q: "19. Which river is known as the 'Sorrow of Bihar'?", a: "A) Gandak", b: "B) Kosi", c: "C) Son", d: "D) Damodar", ans: "Answer: B" },
  { q: "20. The 'Quit India Movement' was launched in the year:", a: "A) 1930", b: "B) 1940", c: "C) 1942", d: "D) 1946", ans: "Answer: C" },
  { q: "21. Who was the first woman Prime Minister of India?", a: "A) Pratibha Patil", b: "B) Indira Gandhi", c: "C) Sarojini Naidu", d: "D) Sucheta Kriplani", ans: "Answer: B" },
  { q: "22. The largest cell in the human body is:", a: "A) Nerve cell", b: "B) Ovum", c: "C) Sperm", d: "D) Liver cell", ans: "Answer: B" },
  { q: "23. Which bank is known as the 'Banker's Bank' in India?", a: "A) SBI", b: "B) PNB", c: "C) RBI", d: "D) ICICI", ans: "Answer: C" },
  { q: "24. The 'Panchayati Raj' system was first adopted by which state?", a: "A) Rajasthan", b: "B) Gujarat", c: "C) Maharashtra", d: "D) Bihar", ans: "Answer: A" },
  { q: "25. What is the SI unit of Pressure?", a: "A) Joule", b: "B) Watt", c: "C) Pascal", d: "D) Newton", ans: "Answer: C" },
  { q: "26. If COAL is coded as 315112, then what is the code for DUST?", a: "A) 4211920", b: "B) 415112", c: "C) 4211820", d: "D) 4201920", ans: "Answer: A" },
  { q: "27. Find the odd one out: 27, 64, 125, 144", a: "A) 27", b: "B) 64", c: "C) 125", d: "D) 144", ans: "Answer: D" },
  { q: "28. Complete the series: 2, 6, 12, 20, 30, ?", a: "A) 40", b: "B) 42", c: "C) 44", d: "D) 46", ans: "Answer: B" },
  { q: "29. Pointing to a lady, a man said, 'Her mother is the only daughter of my mother-in-law.' How is the man related to the lady?", a: "A) Brother", b: "B) Father", c: "C) Uncle", d: "D) Husband", ans: "Answer: B" },
  { q: "30. If '+' means 'x', '-' means '÷', 'x' means '+' and '÷' means '-', then what is 10 + 5 x 10 ÷ 2 - 5?", a: "A) 50", b: "B) 58", c: "C) 59.6", d: "D) 60", ans: "Answer: C" },
  { q: "31. Choose the word which is least like the others: Zinc, Iron, Copper, Mercury", a: "A) Zinc", b: "B) Iron", c: "C) Copper", d: "D) Mercury", ans: "Answer: D" },
  { q: "32. If South-East becomes North, North-East becomes West and so on. What will West become?", a: "A) North-East", b: "B) South-East", c: "C) South-West", d: "D) North-West", ans: "Answer: B" },
  { q: "33. Which number should come in place of the question mark? 3, 5, 9, 17, ?", a: "A) 26", b: "B) 33", c: "C) 35", d: "D) 37", ans: "Answer: B" },
  { q: "34. A is 3 years older than B and 3 years younger than C. While B and D are twins. How many years older is C than D?", a: "A) 2", b: "B) 3", c: "C) 6", d: "D) 12", ans: "Answer: C" },
  { q: "35. Which of the following is a renewable source of energy?", a: "A) Coal", b: "B) Solar", c: "C) Natural Gas", d: "D) Petroleum", ans: "Answer: B" },
  { q: "36. Find the missing number: 1, 4, 9, 16, 25, ?", a: "A) 30", b: "B) 35", c: "C) 36", d: "D) 40", ans: "Answer: C" },
  { q: "37. In a certain code, 'WORK' is '4-12-9-11'. What is 'DONE'?", a: "A) 23-12-13-22", b: "B) 4-15-14-5", c: "C) 23-15-13-22", d: "D) 22-12-13-23", ans: "Answer: A" },
  { q: "38. Select the related word: Carbon : Diamond :: Corundum : ?", a: "A) Garnet", b: "B) Ruby", c: "C) Pukhraj", d: "D) Pearl", ans: "Answer: B" },
  { q: "39. Arrange the words in a meaningful sequence: 1. Harvest 2. Seed 3. Soil 4. Water 5. Crop", a: "A) 3, 2, 4, 5, 1", b: "B) 2, 3, 4, 5, 1", c: "C) 3, 2, 5, 4, 1", d: "D) 3, 4, 2, 5, 1", ans: "Answer: A" },
  { q: "40. If MONDAY is coded as 1315144125, what is the code for FRIDAY?", a: "A) 61894125", b: "B) 61895125", c: "C) 51894125", d: "D) 61794125", ans: "Answer: A" },
  { q: "41. A is the sister of B. B is the brother of C. C is the son of D. How is D related to A?", a: "A) Mother", b: "B) Daughter", c: "C) Son", d: "D) Uncle", ans: "Answer: A" },
  { q: "42. How many squares are in a standard chessboard?", a: "A) 64", b: "B) 100", c: "C) 204", d: "D) 212", ans: "Answer: C" },
  { q: "43. Which letter replaces the question mark? A, D, G, J, ?", a: "A) K", b: "B) L", c: "C) M", d: "D) N", ans: "Answer: C" },
  { q: "44. A person starts walking towards East. After walking 10m, he turns left and walks 5m. Then he turns left again and walks 10m. How far is he from the starting point?", a: "A) 5m", b: "B) 10m", c: "C) 15m", d: "D) 20m", ans: "Answer: A" },
  { q: "45. Choose the alternative which resembles the mirror image of the word: ANS43Q12", a: "A) ANS43Q12", b: "B) S1O34SNA", c: "C) 21O34SNA", d: "D) ANS34P12", ans: "Answer: B" },
  { q: "46. In a row of students, Anil is 7th from left and Sunil is 18th from right. If they interchange their positions, Anil becomes 21st from left. How many students are in the row?", a: "A) 38", b: "B) 39", c: "C) 40", d: "D) 41", ans: "Answer: A" },
  { q: "47. If 1st January 2023 was a Sunday, what day was 1st January 2024?", a: "A) Monday", b: "B) Tuesday", c: "C) Wednesday", d: "D) Sunday", ans: "Answer: A" },
  { q: "48. Find the odd one out: Car, Bicycle, Motorcycle, Truck", a: "A) Car", b: "B) Bicycle", c: "C) Motorcycle", d: "D) Truck", ans: "Answer: B" },
  { q: "49. 'Mountain' is related to 'Valley' as 'Genius' is related to:", a: "A) Brain", b: "B) Idiot", c: "C) Write", d: "D) Think", ans: "Answer: B" },
  { q: "50. If 'A' means '1', 'B' means '2' and so on, what is the sum of letters in 'CAT'?", a: "A) 20", b: "B) 22", c: "C) 24", d: "D) 26", ans: "Answer: C" },
  { q: "51. What is the value of 25% of 40% of 400?", a: "A) 20", b: "B) 40", c: "C) 60", d: "D) 80", ans: "Answer: B" },
  { q: "52. The average of first five prime numbers is:", a: "A) 3.6", b: "B) 5.6", c: "C) 5.4", d: "D) 7.0", ans: "Answer: B" },
  { q: "53. If the cost price of an article is 800 and the selling price is 1000, what is the profit percentage?", a: "A) 20%", b: "B) 25%", c: "C) 30%", d: "D) 40%", ans: "Answer: B" },
  { q: "54. A car travels 180 km in 3 hours. What is its speed in m/s?", a: "A) 15.6 m/s", b: "B) 16.6 m/s", c: "C) 18.0 m/s", d: "D) 20.0 m/s", ans: "Answer: B" },
  { q: "55. Find the value of x: 2x + 10 = 30", a: "A) 5", b: "B) 10", c: "C) 15", d: "D) 20", ans: "Answer: B" },
  { q: "56. The ratio of two numbers is 3:4. If their sum is 70, find the larger number.", a: "A) 30", b: "B) 40", c: "C) 50", d: "D) 60", ans: "Answer: B" },
  { q: "57. A can do a piece of work in 10 days and B can do it in 15 days. How many days will they take to do it together?", a: "A) 5 days", b: "B) 6 days", c: "C) 8 days", d: "D) 12 days", ans: "Answer: B" },
  { q: "58. What is the square root of 625?", a: "A) 15", b: "B) 25", c: "C) 35", d: "D) 45", ans: "Answer: B" },
  { q: "59. If the radius of a circle is 7 cm, what is its area? (Take pi = 22/7)", a: "A) 44 sq.cm", b: "B) 154 sq.cm", c: "C) 176 sq.cm", d: "D) 212 sq.cm", ans: "Answer: B" },
  { q: "60. The HCF of 12 and 18 is:", a: "A) 2", b: "B) 3", c: "C) 6", d: "D) 12", ans: "Answer: C" },
  { q: "61. Simple Interest on 5000 for 2 years at 10% per annum is:", a: "A) 500", b: "B) 1000", c: "C) 1500", d: "D) 2000", ans: "Answer: B" },
  { q: "62. A shopkeeper gives 10% discount on an item marked 500. What is the selling price?", a: "A) 400", b: "B) 450", c: "C) 480", d: "D) 490", ans: "Answer: B" },
  { q: "63. The sum of two consecutive even numbers is 26. Find the smaller number.", a: "A) 10", b: "B) 12", c: "C) 14", d: "D) 16", ans: "Answer: B" },
  { q: "64. If 5 men can build a wall in 12 days, how many days will 10 men take?", a: "A) 4 days", b: "B) 6 days", c: "C) 8 days", d: "D) 10 days", ans: "Answer: B" },
  { q: "65. What is the LCM of 4, 6, and 8?", a: "A) 12", b: "B) 24", c: "C) 48", d: "D) 60", ans: "Answer: B" },
  { q: "66. A train 100m long passes a bridge in 10 seconds at a speed of 72 km/h. What is the length of the bridge?", a: "A) 100m", b: "B) 150m", c: "C) 200m", d: "D) 250m", ans: "Answer: A" },
  { q: "67. 0.05 is what percentage of 0.5?", a: "A) 1%", b: "B) 5%", c: "C) 10%", d: "D) 50%", ans: "Answer: C" },
  { q: "68. The diagonal of a square is 10 cm. Find its area.", a: "A) 25 sq.cm", b: "B) 50 sq.cm", c: "C) 100 sq.cm", d: "D) 200 sq.cm", ans: "Answer: B" },
  { q: "69. If x:y = 2:3 and y:z = 4:5, find x:y:z.", a: "A) 8:12:15", b: "B) 2:3:5", c: "C) 8:10:15", d: "D) 4:6:15", ans: "Answer: A" },
  { q: "70. Find the average of first 10 natural numbers.", a: "A) 5.0", b: "B) 5.5", c: "C) 6.0", d: "D) 6.5", ans: "Answer: B" },
  { q: "71. A man spends 30% of his income and saves 7000. What is his total income?", a: "A) 10,000", b: "B) 12,000", c: "C) 15,000", d: "D) 20,000", ans: "Answer: A" },
  { q: "72. 12 + 12 x 12 / 12 - 12 = ?", a: "A) 0", b: "B) 12", c: "C) 24", d: "D) 144", ans: "Answer: B" },
  { q: "73. The volume of a cube with side 5 cm is:", a: "A) 25 cu.cm", b: "B) 125 cu.cm", c: "C) 150 cu.cm", d: "D) 250 cu.cm", ans: "Answer: B" },
  { q: "74. If log 2 = 0.301, find log 20.", a: "A) 1.301", b: "B) 2.301", c: "C) 0.602", d: "D) 3.010", ans: "Answer: A" },
  { q: "75. Find the value of (99)^2 using identity.", a: "A) 9801", b: "B) 9901", c: "C) 9811", d: "D) 9701", ans: "Answer: A" },
  { q: "76. Choose the correct synonym for 'ABANDON':", a: "A) Keep", b: "B) Forsake", c: "C) Support", d: "D) Adopt", ans: "Answer: B" },
  { q: "77. Choose the correct antonym for 'ANCIENT':", a: "A) Old", b: "B) Modern", c: "C) Antique", d: "D) Primitive", ans: "Answer: B" },
  { q: "78. Which of the following is a synonym of 'Happy'?", a: "A) Sad", b: "B) Joyful", c: "C) Angry", d: "D) Tired", ans: "Answer: B" },
  { q: "79. Identity the correctly spelt word:", a: "A) Occurence", b: "B) Occurrence", c: "C) Ocurence", d: "D) Occurrance", ans: "Answer: B" },
  { q: "80. Choose the one word substitute for: 'One who knows everything'", a: "A) Omnipotent", b: "B) Omniscient", c: "C) Omnipresent", d: "D) Optimist", ans: "Answer: B" },
  { q: "81. Which article is used before the word 'University'?", a: "A) A", b: "B) An", c: "C) The", d: "D) No article", ans: "Answer: A" },
  { q: "82. Change the voice: 'The cat killed the mouse.'", a: "A) The mouse was killed by the cat.", b: "B) The mouse is killed by the cat.", c: "C) The mouse had been killed by the cat.", d: "D) The cat was killed by the mouse.", ans: "Answer: A" },
  { q: "83. Identify the part of speech of 'Fast' in: 'He runs fast.'", a: "A) Noun", b: "B) Adverb", c: "C) Verb", d: "D) Adjective", ans: "Answer: B" },
  { q: "84. Choose the meaning of the idiom: 'At the eleventh hour'", a: "A) At very last moment", b: "B) At 11 o'clock", c: "C) Too early", d: "D) Immediately", ans: "Answer: A" },
  { q: "85. What is the past tense of 'Go'?", a: "A) Goes", b: "B) Went", c: "C) Gone", d: "D) Going", ans: "Answer: B" },
  { q: "86. Choose the correct preposition: He is fond _____ music.", a: "A) At", b: "B) Of", c: "C) With", d: "D) In", ans: "Answer: B" },
  { q: "87. Change into Indirect Speech: He said, 'I am happy.'", a: "A) He said that he is happy.", b: "B) He said that he was happy.", c: "C) He told that he is happy.", d: "D) He says that he is happy.", ans: "Answer: B" },
  { q: "88. Which word is an adjective?", a: "A) Run", b: "B) Beautiful", c: "C) Quickly", d: "D) Table", ans: "Answer: B" },
  { q: "89. Synonym of 'Frugal':", a: "A) Extravagant", b: "B) Economical", c: "C) Generous", d: "D) Wealthy", ans: "Answer: B" },
  { q: "90. Antonym of 'Transparent':", a: "A) Clear", b: "B) Opaque", c: "C) Bright", d: "D) Fragile", ans: "Answer: B" },
  { q: "91. One who looks at the bright side of things:", a: "A) Pessimist", b: "B) Optimist", c: "C) Atheist", d: "D) Altruist", ans: "Answer: B" },
  { q: "92. Correct the sentence: 'I prefer coffee than tea.'", a: "A) I prefer coffee to tea.", b: "B) I prefer coffee over tea.", c: "C) I prefer coffee more than tea.", d: "D) No correction required.", ans: "Answer: A" },
  { q: "93. What is the synonym of 'Quick'?", a: "A) Slow", b: "B) Fast", c: "C) Large", d: "D) Hard", ans: "Answer: B" },
  { q: "94. Meaning of 'Break a leg':", a: "A) To get injured", b: "B) Good luck", c: "C) To work hard", d: "D) To stop working", ans: "Answer: B" },
  { q: "95. Synonym of 'Diligent':", a: "A) Lazy", b: "B) Hardworking", c: "C) Smart", d: "D) Quick", ans: "Answer: B" },
  { q: "96. Identify the part of speech of the underlined word: 'She sings beautifully.'", a: "A) Adjective", b: "B) Adverb", c: "C) Noun", d: "D) Verb", ans: "Answer: B" },
  { q: "97. Plural of 'Criterion':", a: "A) Criterions", b: "B) Criteria", c: "C) Criterias", d: "D) Criteriones", ans: "Answer: B" },
  { q: "98. Which of these is a noun?", a: "A) Eat", b: "B) Apple", c: "C) Sweetly", d: "D) Happy", ans: "Answer: B" },
  { q: "99. Choose the correct sentence:", a: "A) He do not have a car.", b: "B) He does not has a car.", c: "C) He does not have a car.", d: "D) He do not has a car.", ans: "Answer: C" },
  { q: "100. Antonym of 'Barren':", a: "A) Fertile", b: "B) Empty", c: "C) Dry", d: "D) Harsh", ans: "Answer: A" }
];

mcqs.forEach(item => {
  doc.fontSize(11).text(item.q);
  doc.fontSize(11).text(item.a);
  doc.fontSize(11).text(item.b);
  doc.fontSize(11).text(item.c);
  doc.fontSize(11).text(item.d);
  doc.fontSize(11).text(item.ans);
  doc.moveDown(1);
});

doc.end();
console.log('PDF generated successfully: ' + outputPath);
