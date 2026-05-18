const PDFDocument = require('pdfkit');
const fs = require('fs');

const doc = new PDFDocument({ margin: 50 });
const outputPath = 'CoalIndia_MCQs_Cleaned.pdf';
doc.pipe(fs.createWriteStream(outputPath));

doc.fontSize(16).font('Helvetica-Bold').text('Coal India Online Computer Test - 100 MCQs', { align: 'center' });
doc.moveDown(2);

const mcqs = [
  { q: "Where is the headquarters of Coal India Limited located?", a: "New Delhi", b: "Kolkata", c: "Dhanbad", d: "Ranchi", ans: "B" },
  { q: "In which year was Coal India Limited granted the Maharatna status?", a: "2008", b: "2010", c: "2011", d: "2013", ans: "C" },
  { q: "Which state in India has the largest coal reserves?", a: "Odisha", b: "Chhattisgarh", c: "Jharkhand", d: "West Bengal", ans: "C" },
  { q: "What is the rank of India in the world in terms of total coal production?", a: "First", b: "Second", c: "Third", d: "Fourth", ans: "B" },
  { q: "Which type of coal has the highest carbon content?", a: "Lignite", b: "Bituminous", c: "Peat", d: "Anthracite", ans: "D" },
  { q: "The World Environment Day is celebrated every year on which date?", a: "June 5", b: "July 11", c: "September 16", d: "April 22", ans: "A" },
  { q: "Who was the first Governor-General of independent India?", a: "Lord Mountbatten", b: "C. Rajagopalachari", c: "Dr. Rajendra Prasad", d: "Sardar Patel", ans: "A" },
  { q: "The Kuchipudi dance form originated in which Indian state?", a: "Tamil Nadu", b: "Kerala", c: "Andhra Pradesh", d: "Karnataka", ans: "C" },
  { q: "Which planet is known as the Red Planet?", a: "Venus", b: "Mars", c: "Jupiter", d: "Saturn", ans: "B" },
  { q: "The fundamental duties are mentioned in which part of the Indian Constitution?", a: "Part III", b: "Part IV-A", c: "Part V", d: "Part VI", ans: "B" },
  { q: "What is the currency of Japan?", a: "Won", b: "Yuan", c: "Yen", d: "Ringgit", ans: "C" },
  { q: "Which enzyme is responsible for the digestion of protein in the human body?", a: "Amylase", b: "Lipase", c: "Pepsin", d: "Trypsin", ans: "C" },
  { q: "The Silent Valley National Park is located in which state?", a: "Uttarakhand", b: "Kerala", c: "Himachal Pradesh", d: "Assam", ans: "B" },
  { q: "Who is the author of the book Wings of Fire?", a: "V.S. Naipaul", b: "A.P.J. Abdul Kalam", c: "Arundhati Roy", d: "Vikram Seth", ans: "B" },
  { q: "In which year did the First Battle of Panipat take place?", a: "1526", b: "1556", c: "1761", d: "1576", ans: "A" },
  { q: "Which Indian city is known as the Coal Capital of India?", a: "Singrauli", b: "Dhanbad", c: "Asansol", d: "Korba", ans: "B" },
  { q: "The Nobel Prize for Peace is awarded in which city?", a: "Stockholm", b: "Oslo", c: "Geneva", d: "New York", ans: "B" },
  { q: "What is the chemical symbol for Gold?", a: "Ag", b: "Au", c: "Pt", d: "Fe", ans: "B" },
  { q: "Which river is known as the Sorrow of Bihar?", a: "Gandak", b: "Kosi", c: "Son", d: "Damodar", ans: "B" },
  { q: "The Quit India Movement was launched in the year:", a: "1930", b: "1940", c: "1942", d: "1946", ans: "C" },
  { q: "Who was the first woman Prime Minister of India?", a: "Pratibha Patil", b: "Indira Gandhi", c: "Sarojini Naidu", d: "Sucheta Kriplani", ans: "B" },
  { q: "The largest cell in the human body is:", a: "Nerve cell", b: "Ovum", c: "Sperm", d: "Liver cell", ans: "B" },
  { q: "Which bank is known as the Bankers Bank in India?", a: "SBI", b: "PNB", c: "RBI", d: "ICICI", ans: "C" },
  { q: "The Panchayati Raj system was first adopted by which state?", a: "Rajasthan", b: "Gujarat", c: "Maharashtra", d: "Bihar", ans: "A" },
  { q: "What is the SI unit of Pressure?", a: "Joule", b: "Watt", c: "Pascal", d: "Newton", ans: "C" },
  { q: "Find the odd one out: 27, 64, 125, 144", a: "27", b: "64", c: "125", d: "144", ans: "D" },
  { q: "Complete the series: 2, 6, 12, 20, 30, ?", a: "40", b: "42", c: "44", d: "46", ans: "B" },
  { q: "Select the related word: Carbon is to Diamond as Corundum is to?", a: "Garnet", b: "Ruby", c: "Pukhraj", d: "Pearl", ans: "B" },
  { q: "Which letter replaces the question mark? A, D, G, J, ?", a: "K", b: "L", c: "M", d: "N", ans: "C" },
  { q: "Find the odd one out: Car, Bicycle, Motorcycle, Truck", a: "Car", b: "Bicycle", c: "Motorcycle", d: "Truck", ans: "B" },
  { q: "Choose the odd one out: Zinc, Iron, Copper, Mercury", a: "Zinc", b: "Iron", c: "Copper", d: "Mercury", ans: "D" },
  { q: "Which number should come in place of the question mark? 3, 5, 9, 17, ?", a: "26", b: "33", c: "35", d: "37", ans: "B" },
  { q: "Which of the following is a renewable source of energy?", a: "Coal", b: "Solar", c: "Natural Gas", d: "Petroleum", ans: "B" },
  { q: "Find the missing number: 1, 4, 9, 16, 25, ?", a: "30", b: "35", c: "36", d: "40", ans: "C" },
  { q: "Mountain is related to Valley as Genius is related to?", a: "Brain", b: "Idiot", c: "Write", d: "Think", ans: "B" },
  { q: "What is the value of 25 percent of 40 percent of 400?", a: "20", b: "40", c: "60", d: "80", ans: "B" },
  { q: "The average of first five prime numbers is:", a: "3.6", b: "5.6", c: "5.4", d: "7.0", ans: "B" },
  { q: "If the cost price of an article is 800 and selling price is 1000, what is the profit percentage?", a: "20 percent", b: "25 percent", c: "30 percent", d: "40 percent", ans: "B" },
  { q: "A car travels 180 km in 3 hours. What is its speed in m per s?", a: "15.6", b: "16.6", c: "18.0", d: "20.0", ans: "B" },
  { q: "Find the value of x: 2x plus 10 equals 30", a: "5", b: "10", c: "15", d: "20", ans: "B" },
  { q: "The ratio of two numbers is 3 to 4. If their sum is 70, find the larger number.", a: "30", b: "40", c: "50", d: "60", ans: "B" },
  { q: "A can do a piece of work in 10 days and B can do it in 15 days. How many days will they take together?", a: "5 days", b: "6 days", c: "8 days", d: "12 days", ans: "B" },
  { q: "What is the square root of 625?", a: "15", b: "25", c: "35", d: "45", ans: "B" },
  { q: "If the radius of a circle is 7 cm, what is its area?", a: "44 sq cm", b: "154 sq cm", c: "176 sq cm", d: "212 sq cm", ans: "B" },
  { q: "The HCF of 12 and 18 is:", a: "2", b: "3", c: "6", d: "12", ans: "C" },
  { q: "Simple Interest on 5000 for 2 years at 10 percent per annum is:", a: "500", b: "1000", c: "1500", d: "2000", ans: "B" },
  { q: "A shopkeeper gives 10 percent discount on an item marked 500. What is the selling price?", a: "400", b: "450", c: "480", d: "490", ans: "B" },
  { q: "The sum of two consecutive even numbers is 26. Find the smaller number.", a: "10", b: "12", c: "14", d: "16", ans: "B" },
  { q: "If 5 men can build a wall in 12 days, how many days will 10 men take?", a: "4 days", b: "6 days", c: "8 days", d: "10 days", ans: "B" },
  { q: "What is the LCM of 4, 6, and 8?", a: "12", b: "24", c: "48", d: "60", ans: "B" },
  { q: "0.05 is what percentage of 0.5?", a: "1 percent", b: "5 percent", c: "10 percent", d: "50 percent", ans: "C" },
  { q: "The diagonal of a square is 10 cm. Find its area.", a: "25 sq cm", b: "50 sq cm", c: "100 sq cm", d: "200 sq cm", ans: "B" },
  { q: "Find the average of first 10 natural numbers.", a: "5.0", b: "5.5", c: "6.0", d: "6.5", ans: "B" },
  { q: "The volume of a cube with side 5 cm is:", a: "25 cu cm", b: "125 cu cm", c: "150 cu cm", d: "250 cu cm", ans: "B" },
  { q: "If log 2 equals 0.301, find log 20.", a: "1.301", b: "2.301", c: "0.602", d: "3.010", ans: "A" },
  { q: "Find the value of 99 squared using identity.", a: "9801", b: "9901", c: "9811", d: "9701", ans: "A" },
  { q: "Choose the correct synonym for ABANDON:", a: "Keep", b: "Forsake", c: "Support", d: "Adopt", ans: "B" },
  { q: "Choose the correct antonym for ANCIENT:", a: "Old", b: "Modern", c: "Antique", d: "Primitive", ans: "B" },
  { q: "Which of the following is a synonym of Happy?", a: "Sad", b: "Joyful", c: "Angry", d: "Tired", ans: "B" },
  { q: "Identify the correctly spelt word:", a: "Occurence", b: "Occurrence", c: "Ocurence", d: "Occurrance", ans: "B" },
  { q: "One who knows everything is called:", a: "Omnipotent", b: "Omniscient", c: "Omnipresent", d: "Optimist", ans: "B" },
  { q: "Which article is used before the word University?", a: "A", b: "An", c: "The", d: "No article", ans: "A" },
  { q: "Identify the part of speech of Fast in: He runs fast.", a: "Noun", b: "Adverb", c: "Verb", d: "Adjective", ans: "B" },
  { q: "What is the meaning of the idiom At the eleventh hour?", a: "At very last moment", b: "At 11 o clock", c: "Too early", d: "Immediately", ans: "A" },
  { q: "What is the past tense of Go?", a: "Goes", b: "Went", c: "Gone", d: "Going", ans: "B" },
  { q: "Choose the correct preposition: He is fond of music.", a: "At", b: "Of", c: "With", d: "In", ans: "B" },
  { q: "Which word is an adjective?", a: "Run", b: "Beautiful", c: "Quickly", d: "Table", ans: "B" },
  { q: "Synonym of Frugal:", a: "Extravagant", b: "Economical", c: "Generous", d: "Wealthy", ans: "B" },
  { q: "Antonym of Transparent:", a: "Clear", b: "Opaque", c: "Bright", d: "Fragile", ans: "B" },
  { q: "One who looks at the bright side of things:", a: "Pessimist", b: "Optimist", c: "Atheist", d: "Altruist", ans: "B" },
  { q: "What is the synonym of Quick?", a: "Slow", b: "Fast", c: "Large", d: "Hard", ans: "B" },
  { q: "Meaning of Break a leg:", a: "To get injured", b: "Good luck", c: "To work hard", d: "To stop working", ans: "B" },
  { q: "Synonym of Diligent:", a: "Lazy", b: "Hardworking", c: "Smart", d: "Quick", ans: "B" },
  { q: "Plural of Criterion:", a: "Criterions", b: "Criteria", c: "Criterias", d: "Criteriones", ans: "B" },
  { q: "Which of these is a noun?", a: "Eat", b: "Apple", c: "Sweetly", d: "Happy", ans: "B" },
  { q: "Antonym of Barren:", a: "Fertile", b: "Empty", c: "Dry", d: "Harsh", ans: "A" },
  { q: "Coal India was established in which year?", a: "1971", b: "1973", c: "1975", d: "1979", ans: "B" },
  { q: "What does CIL stand for?", a: "Central India Limited", b: "Coal India Limited", c: "Coal Industry League", d: "Central Industry Ltd", ans: "B" },
  { q: "Which Ministry controls Coal India Limited?", a: "Ministry of Finance", b: "Ministry of Coal", c: "Ministry of Industry", d: "Ministry of Power", ans: "B" },
  { q: "The full form of SECL is:", a: "South Eastern Coal Limited", b: "South Eastern Coalfields Limited", c: "Southern Energy Coal Ltd", d: "State Energy Coal Limited", ans: "B" },
  { q: "BCCL stands for:", a: "Bharat Coal and Coke Limited", b: "Bharat Coking Coal Limited", c: "Bengal Coal Coke Limited", d: "Bihar Coal Company Limited", ans: "B" },
  { q: "Which subsidiary of CIL operates in Rajasthan?", a: "WCL", b: "CCL", c: "NLC", d: "RRVUNL", ans: "A" },
  { q: "Which is the largest coal producing subsidiary of CIL?", a: "ECL", b: "BCCL", c: "MCL", d: "SECL", ans: "D" },
  { q: "The safety department in coal mines follows which Act?", a: "Factory Act 1948", b: "Mines Act 1952", c: "Mines Act 1940", d: "Coal Act 1950", ans: "B" },
  { q: "In open cast mining, what is the ratio of overburden to coal called?", a: "Cut ratio", b: "Strip ratio", c: "Bench ratio", d: "Cover ratio", ans: "B" },
  { q: "Which gas is most commonly found in coal mines and causes explosions?", a: "Carbon dioxide", b: "Oxygen", c: "Methane", d: "Nitrogen", ans: "C" },
  { q: "What is the main purpose of a ventilation system in a coal mine?", a: "Cool the mine", b: "Remove dust and gases", c: "Provide lighting", d: "Carry equipment", ans: "B" },
  { q: "Which of the following is NOT a type of coal?", a: "Lignite", b: "Peat", c: "Graphene", d: "Anthracite", ans: "C" },
  { q: "The process of extracting coal by cutting from the surface is called:", a: "Underground mining", b: "Open cast mining", c: "Drift mining", d: "Shaft mining", ans: "B" },
  { q: "Which Indian state has the highest number of coal mines?", a: "Bihar", b: "Odisha", c: "Jharkhand", d: "West Bengal", ans: "C" },
  { q: "What does the term GDP stand for?", a: "Gross Domestic Product", b: "General Domestic Policy", c: "Gross Development Plan", d: "General Development Product", ans: "A" },
  { q: "The President of India is elected by:", a: "Lok Sabha members only", b: "Rajya Sabha members only", c: "Elected members of Parliament and State Legislatures", d: "All citizens of India", ans: "C" },
  { q: "Which article of the Indian Constitution abolishes untouchability?", a: "Article 14", b: "Article 17", c: "Article 19", d: "Article 21", ans: "B" },
  { q: "The Right to Education is a Fundamental Right under Article:", a: "21", b: "21A", c: "22", d: "23", ans: "B" },
  { q: "Who is known as the Father of the Indian Constitution?", a: "Mahatma Gandhi", b: "Jawaharlal Nehru", c: "B.R. Ambedkar", d: "Sardar Patel", ans: "C" },
  { q: "Which device converts AC to DC?", a: "Inverter", b: "Rectifier", c: "Transformer", d: "Oscillator", ans: "B" },
  { q: "Ohm's law relates which three quantities?", a: "Power, current, time", b: "Voltage, current, resistance", c: "Force, mass, acceleration", d: "Energy, power, time", ans: "B" },
  { q: "The unit of electrical resistance is:", a: "Ampere", b: "Watt", c: "Ohm", d: "Volt", ans: "C" },
  { q: "What is the full form of CPU?", a: "Central Processing Unit", b: "Central Program Unit", c: "Core Processing Unit", d: "Computer Processing Unit", ans: "A" },
  { q: "Which of the following is an input device?", a: "Monitor", b: "Printer", c: "Keyboard", d: "Speaker", ans: "C" },
  { q: "1 Byte is equal to how many bits?", a: "4", b: "8", c: "16", d: "32", ans: "B" },
];

mcqs.forEach((item, index) => {
  doc.fontSize(11).font('Helvetica-Bold').text(`${index + 1}. ${item.q}`);
  doc.fontSize(11).font('Helvetica').text(`A) ${item.a}`);
  doc.fontSize(11).font('Helvetica').text(`B) ${item.b}`);
  doc.fontSize(11).font('Helvetica').text(`C) ${item.c}`);
  doc.fontSize(11).font('Helvetica').text(`D) ${item.d}`);
  doc.fontSize(11).font('Helvetica').text(`Answer: ${item.ans}`);
  doc.moveDown(0.8);
});

doc.end();
console.log(`PDF generated successfully: ${outputPath} (${mcqs.length} questions)`);
