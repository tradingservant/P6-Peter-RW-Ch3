const fs = require("fs");
const vm = require("vm");
const path = require("path");

const code = fs.readFileSync(path.join(__dirname, "../js/content.js"), "utf8");
const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(code, sandbox);
const content = sandbox.P6_CONTENT;

const failures = [];
function assert(cond, message) {
  if (!cond) failures.push(message);
}

const ids = content.modules.map((mod) => mod.id);
assert(ids.join() === "vocab,verbs,since,reading,diary", "module order");

const never = [
  "There were traffic jams since fallen trees had blocked many roads.",
  "there weren't enough trains for all the passengers",
  "Because they couldn't charge them.",
  "4th August 2025",
  "to teach us how much trains weigh",
  "Hong Kong is very small",
  "Tamu Massif is near Hong Kong",
  "in a diary",
];

function walk(step, visit) {
  if (step.kind === "mcq") visit(step.answer, step.options, step.q);
  if (step.items && step.kind !== "teach") {
    step.items.forEach((item) => {
      if (item.answer) visit(item.answer, item.options || step.bank || null, item.q || item.before || item.say || item.id);
    });
  }
  if (step.kind === "scenePick") {
    step.scenes.forEach((scene) => visit(scene.answer, step.choices.map((choice) => choice.id), scene.scene));
  }
  if (step.kind === "builder") {
    step.items.forEach((item) => visit(item.full, null, item.id));
  }
}

const answers = [];
content.modules.forEach((mod) => {
  mod.steps.forEach((step) => {
    walk(step, (answer, options, label) => {
      answers.push(answer);
      if (options) assert(options.includes(answer), `${mod.id} missing option for ${label}: ${answer}`);
      never.forEach((bad) => assert(answer !== bad, `${mod.id} marked a wrong answer correct: ${bad}`));
    });
  });
});

const verbStep = content.modules.find((mod) => mod.id === "verbs").steps.find((step) => step.kind === "bank");
const verbMap = Object.fromEntries(verbStep.items.map((item) => [item.id, item.answer]));
assert(verbMap.wash === "washed away", "wash");
assert(verbMap.kill === "killed", "kill");
assert(verbMap.destroy === "destroyed", "destroy");
assert(verbMap.damage === "damaged", "damage");
assert(verbMap.bring === "brought", "bring");
assert(verbMap.knock === "knocked down", "knock");
assert(new Set(verbStep.items.map((item) => item.answer)).size === 6, "verbs once");

const nameStep = content.modules.find((mod) => mod.id === "vocab").steps.find((step) => step.kind === "bank");
const names = Object.fromEntries(nameStep.items.map((item) => [item.id, item.answer]));
assert(names["name-tsunami"] === "tsunami", "tsunami");
assert(names["name-drought"] === "a drought", "drought");
assert(names["name-quake"] === "earthquake", "quake");
assert(names["name-typhoon"] === "typhoon", "typhoon");
assert(names["name-flood"] === "flood", "flood");
assert(names["name-slides"] === "landslides", "slides");

const scenes = content.modules.find((mod) => mod.id === "vocab").steps.find((step) => step.kind === "scenePick");
const sceneMap = Object.fromEntries(scenes.scenes.map((scene) => [scene.scene, scene.answer]));
assert(sceneMap.drought === "B" && sceneMap.typhoon === "D" && sceneMap.earthquake === "C", "A2 top");
assert(sceneMap.flood === "E" && sceneMap.landslides === "E" && sceneMap.tsunami === "A", "A2 bottom");
assert(scenes.sentences.A.includes("washed away"), "sentence A");
assert(scenes.sentences.C.includes("destroyed") && scenes.sentences.C.includes("damaged"), "sentence C");
assert(scenes.sentences.D.includes("brought") && scenes.sentences.D.includes("knocked down"), "sentence D");
assert(scenes.sentences.E.includes("flood") && scenes.sentences.E.includes("landslides"), "sentence E");
assert(!scenes.sentences.E.includes("earthquake"), "E is not earthquake");

const since = content.modules.find((mod) => mod.id === "since");
const fulls = since.steps.filter((step) => step.kind === "builder").flatMap((step) => step.items.map((item) => item.full));
assert(fulls.includes("There are traffic jams since fallen trees have blocked many roads."), "traffic since");
assert(fulls.includes("People are unhappy about the train service since there are not enough trains for all the passengers."), "train since");
const sinceFlat = JSON.stringify(since);
assert(sinceFlat.includes("We have no electricity since the typhoon has damaged the power cables."), "power since");
assert(answers.includes("Since the typhoon has damaged the power cables, we have no electricity."), "hotel since");

const readingAnswers = answers.join(" | ");
[
  "winds",
  "world",
  "1,200",
  "hour",
  "483",
  "300",
  "about ten minutes",
  "about 60",
  "75,000 kg",
  "lava",
  "1,500",
  "80",
  "Tamu Massif",
  "Japan and Hawaii",
  "120,000 square miles",
  "about 200,000",
  "1 in 20",
  "fertile land",
  "in an encyclopaedia",
  "to show how powerful tornadoes are",
  "Tamu Massif is very large",
].forEach((fact) => assert(readingAnswers.includes(fact), `missing fact ${fact}`));

assert(answers.includes("2nd August 2025"), "start date");
assert(answers.includes("played") && answers.includes("inside"), "diary cloze");
assert(answers.includes("the typhoon"), "it = typhoon");
assert(answers.includes("all of them"), "emergency box");
assert(answers.includes("on a plane"), "7 August");
assert(answers.includes("big pieces of wood"), "windows");
assert(answers.includes("The news was on the hotel TVs."), "tvs");
assert(answers.includes("The typhoon had damaged the power cables, so there was no electricity."), "phones");
assert(answers.includes("It was too dangerous to swim, so Jason stayed inside."), "not swimming");
assert(answers.includes("jet plane"), "tsunami speed");

const readingText = JSON.stringify(content.modules.find((mod) => mod.id === "reading").steps);
["483", "1,200", "Tamu Massif", "1,200°C", "ten minutes", "75,000", "25 metres"].forEach((bit) => {
  assert(readingText.includes(bit), `passage missing ${bit}`);
});

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(`ok ${answers.length} keyed answers`);
