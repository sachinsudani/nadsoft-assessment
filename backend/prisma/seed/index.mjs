import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const subjects = [
  { name: "Mathematics", code: "MAT101", department: "Science" },
  { name: "Physics", code: "PHY101", department: "Science" },
  { name: "Chemistry", code: "CHEM101", department: "Science" },
  { name: "Biology", code: "BIO101", department: "Science" },
  { name: "History", code: "HIS101", department: "Arts" },
  { name: "Geography", code: "GEO101", department: "Arts" },
  { name: "English Literature", code: "ENG101", department: "Arts" },
  { name: "Computer Science", code: "COM101", department: "Technology" },
  { name: "Economics", code: "ECO101", department: "Commerce" },
  { name: "Business Studies", code: "BUS101", department: "Commerce" },
];

// 20 realistic student entries
const studentData = [
  { firstName: "Aarav", lastName: "Patel", email: "aarav.patel@example.com", class: "8C", age: 13 },
  { firstName: "Riya", lastName: "Shah", email: "riya.shah@example.com", class: "9A", age: 14 },
  { firstName: "Aditya", lastName: "Singh", email: "aditya.singh@example.com", class: "10B", age: 15 },
  { firstName: "Saanvi", lastName: "Mehta", email: "saanvi.mehta@example.com", class: "8B", age: 13 },
  { firstName: "Vivaan", lastName: "Kumar", email: "vivaan.kumar@example.com", class: "7A", age: 12 },
  { firstName: "Ananya", lastName: "Desai", email: "ananya.desai@example.com", class: "7C", age: 12 },
  { firstName: "Ishan", lastName: "Reddy", email: "ishan.reddy@example.com", class: "9B", age: 14 },
  { firstName: "Diya", lastName: "Rao", email: "diya.rao@example.com", class: "10C", age: 15 },
  { firstName: "Kabir", lastName: "Kapoor", email: "kabir.kapoor@example.com", class: "8A", age: 13 },
  { firstName: "Kavya", lastName: "Joshi", email: "kavya.joshi@example.com", class: "9C", age: 14 },
  { firstName: "Arjun", lastName: "Malhotra", email: "arjun.malhotra@example.com", class: "7B", age: 12 },
  { firstName: "Sara", lastName: "Chopra", email: "sara.chopra@example.com", class: "10A", age: 15 },
  { firstName: "Reyansh", lastName: "Gupta", email: "reyansh.gupta@example.com", class: "6C", age: 11 },
  { firstName: "Aditi", lastName: "Verma", email: "aditi.verma@example.com", class: "6A", age: 11 },
  { firstName: "Neil", lastName: "D'Souza", email: "neil.dsouza@example.com", class: "7C", age: 12 },
  { firstName: "Pooja", lastName: "Saxena", email: "pooja.saxena@example.com", class: "9A", age: 14 },
  { firstName: "Rohan", lastName: "Mehra", email: "rohan.mehra@example.com", class: "8B", age: 13 },
  { firstName: "Mira", lastName: "Bhatia", email: "mira.bhatia@example.com", class: "10B", age: 15 },
  { firstName: "Dev", lastName: "Nair", email: "dev.nair@example.com", class: "9B", age: 14 },
  { firstName: "Neha", lastName: "Khanna", email: "neha.khanna@example.com", class: "6B", age: 11 },
];

const terms = ['First', 'Second', 'Final'];
const years = [ 2023, 2024, 2025];

async function main() {
  // Seed subjects
  for (const s of subjects) {
    await prisma.subject.upsert({
      where: { code: s.code },
      update: {},
      create: s,
    });
  }
  console.log("✅ Subjects seeded");

  // Seed students
  const students = [];
  for (const entry of studentData) {
    const student = await prisma.student.create({ data: entry });
    students.push(student);
  }
  console.log(`✅ Created ${students.length} students`);

  const allSubjects = await prisma.subject.findMany();

  // Seed marks: each student gets marks for 4 random subjects
  let markCount = 0;
  for (const student of students) {
    const shuffled = allSubjects.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 4);

    for (const subj of selected) {
      await prisma.mark.create({
        data: {
          score: parseFloat((Math.random() * 40 + 60).toFixed(2)),
          term: terms[Math.floor(Math.random() * terms.length)],
          year: years[Math.floor(Math.random() * years.length)],
          student: { connect: { id: student.id } },
          subject: { connect: { id: subj.id } },
        }
      });
      markCount++;
    }
  }
  console.log(`✅ Created ${markCount} marks`);

  await prisma.$disconnect();
}

main()
  .catch(e => { console.error(e); prisma.$disconnect(); process.exit(1); })
  .then(() => console.log("\n🎉 Seeding complete!"));
