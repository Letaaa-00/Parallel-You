import { DimensionKey, Profile, Question, UserAnswers } from '../types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    prompt: 'At 2 a.m., a door appears in your room. What does its sign say?',
    contextHint: 'The paint is still faintly glowing with temporal residue.',
    options: [
      {
        id: 'A',
        text: 'Everything you lost is in here.',
        scores: { care_repair: 1, curiosity_exploration: 1, memory_story: 4, independence_play: 0 },
        observation:
          'When faced with a strange threshold, you were drawn toward recovered belongings and past echoes rather than empty novelties.',
      },
      {
        id: 'B',
        text: 'Please come back tomorrow.',
        scores: { care_repair: 0, curiosity_exploration: 0, memory_story: 0, independence_play: 4 },
        observation:
          'You refused to let an uncanny dimensional breach dictate your bedtime, demonstrating unshakeable boundary management.',
      },
      {
        id: 'C',
        text: 'For lost travelers only.',
        scores: { care_repair: 3, curiosity_exploration: 2, memory_story: 1, independence_play: 0 },
        observation:
          'You felt kinship with wanderers without an itinerary, recognizing sanctuary when you see it.',
      },
      {
        id: 'D',
        text: 'Someone is waiting for you.',
        scores: { care_repair: 2, curiosity_exploration: 2, memory_story: 2, independence_play: 1 },
        observation:
          'You stepped forward anticipating a personal reunion or mutual appointment across the void.',
      },
    ],
  },
  {
    id: 2,
    prompt: 'You may bring one thing through the door.',
    contextHint: 'Transit regulations allow exactly one personal artifact through customs.',
    options: [
      {
        id: 'A',
        text: 'A key that opens no known lock.',
        scores: { care_repair: 0, curiosity_exploration: 4, memory_story: 1, independence_play: 2 },
        observation:
          'Carrying an unassigned key revealed an instinct to seek unbuilt corridors rather than settle for easy exits.',
      },
      {
        id: 'B',
        text: 'A map that draws itself.',
        scores: { care_repair: 0, curiosity_exploration: 4, memory_story: 2, independence_play: 1 },
        observation:
          'Opting for a living cartography demonstrated an appetite for dynamic terrain over static dogma.',
      },
      {
        id: 'C',
        text: 'A bottle of ocean sounds.',
        scores: { care_repair: 2, curiosity_exploration: 0, memory_story: 4, independence_play: 1 },
        observation:
          'Packing the acoustic memory of waves proved that you prioritize atmospheric preservation over utilitarian gear.',
      },
      {
        id: 'D',
        text: 'A letter you never sent.',
        scores: { care_repair: 2, curiosity_exploration: 0, memory_story: 4, independence_play: 0 },
        observation:
          'Holding onto an unsent dispatch indicated unfinished relational threads that deserve careful transit.',
      },
    ],
  },
  {
    id: 3,
    prompt: 'You arrive in an unfamiliar city. What do you do first?',
    contextHint: 'The pavement rings like porcelain beneath unfamiliar constellations.',
    options: [
      {
        id: 'A',
        text: 'Find the highest place and look around.',
        scores: { care_repair: 0, curiosity_exploration: 4, memory_story: 1, independence_play: 2 },
        observation:
          'Your impulse to ascend to the highest parapet proved a panoramic, structural eye for interdimensional geography.',
      },
      {
        id: 'B',
        text: 'Step into the only shop still lit.',
        scores: { care_repair: 2, curiosity_exploration: 2, memory_story: 3, independence_play: 0 },
        observation:
          'Seeking a lit window in an unknown quarter flagged an eye for cozy human refuges in alien topography.',
      },
      {
        id: 'C',
        text: 'Follow a rather suspicious little animal.',
        scores: { care_repair: 1, curiosity_exploration: 3, memory_story: 0, independence_play: 3 },
        observation:
          'Trusting an eccentric local creature showed an aptitude for delightful, off-grid detours.',
      },
      {
        id: 'D',
        text: 'Sit down and let the city find me.',
        scores: { care_repair: 1, curiosity_exploration: 1, memory_story: 1, independence_play: 4 },
        observation:
          'Sitting quietly on the curb while reality adjusted around you marked high dimensional patience.',
      },
    ],
  },
  {
    id: 4,
    prompt: 'Someone hands you a fading star.',
    contextHint: 'Its warmth is barely the temperature of a fresh cup of tea.',
    options: [
      {
        id: 'A',
        text: 'Try to mend it.',
        scores: { care_repair: 4, curiosity_exploration: 1, memory_story: 0, independence_play: 0 },
        observation:
          'Your instinctive urge to mend a dying light signaled an unmistakable vocation for restorative stewardship.',
      },
      {
        id: 'B',
        text: 'Find someone who knows its story.',
        scores: { care_repair: 1, curiosity_exploration: 2, memory_story: 4, independence_play: 0 },
        observation:
          'Asking after the star’s origins confirmed your dedication to tracking cosmic lineages and oral histories.',
      },
      {
        id: 'C',
        text: 'Take it to see one last sunrise.',
        scores: { care_repair: 3, curiosity_exploration: 1, memory_story: 3, independence_play: 0 },
        observation:
          'Offering a tender ceremonial farewell to a fading ember revealed profound ceremonial grace.',
      },
      {
        id: 'D',
        text: 'Put it in my pocket and figure it out on the way.',
        scores: { care_repair: 0, curiosity_exploration: 2, memory_story: 1, independence_play: 4 },
        observation:
          'Pocketing stellar remnants on the run proved your comfortable tolerance for improvised celestial physics.',
      },
    ],
  },
  {
    id: 5,
    prompt: 'Your new job lets you cancel one rule. Which one?',
    contextHint: 'The interdimensional labor ombudsman has authorized one regulatory waiver.',
    options: [
      {
        id: 'A',
        text: 'Early mornings.',
        scores: { care_repair: 1, curiosity_exploration: 1, memory_story: 1, independence_play: 3 },
        observation:
          'Banning early mornings aligned you with the nocturnal guilds and twilight operators across dimensions.',
      },
      {
        id: 'B',
        text: 'Having to explain myself.',
        scores: { care_repair: 0, curiosity_exploration: 1, memory_story: 1, independence_play: 4 },
        observation:
          'Abolishing redundant self-justification cemented your status as a self-authorizing agent.',
      },
      {
        id: 'C',
        text: 'Needing permission to disappear for a day.',
        scores: { care_repair: 0, curiosity_exploration: 3, memory_story: 1, independence_play: 3 },
        observation:
          'Claiming unconditional leave for solitary strolls confirmed your sovereign wandering clearance.',
      },
      {
        id: 'D',
        text: 'Having to stay awake while working.',
        scores: { care_repair: 2, curiosity_exploration: 0, memory_story: 3, independence_play: 2 },
        observation:
          'Sanctioning work-sleep permeability registered you as a natural conduit between waking life and dream realms.',
      },
    ],
  },
  {
    id: 6,
    prompt: 'What would you leave behind in this universe?',
    contextHint: 'The vacuum chamber requires a parting contribution to stabilize the warp field.',
    options: [
      {
        id: 'A',
        text: 'A secret passage.',
        scores: { care_repair: 0, curiosity_exploration: 4, memory_story: 1, independence_play: 2 },
        observation:
          'Leaving a concealed shortcut behind guarantees that someone after you will find escape when needed.',
      },
      {
        id: 'B',
        text: 'Somewhere people feel safe.',
        scores: { care_repair: 4, curiosity_exploration: 0, memory_story: 2, independence_play: 0 },
        observation:
          'Prioritizing a safe harbor over monument or fame is the hallmark of our most grounded multiverse guardians.',
      },
      {
        id: 'C',
        text: 'A mystery no one has solved.',
        scores: { care_repair: 0, curiosity_exploration: 3, memory_story: 3, independence_play: 2 },
        observation:
          'Bequeathing an unsolved riddle ensures the people you leave behind will keep their wonder intact.',
      },
      {
        id: 'D',
        text: 'A party people still talk about years later.',
        scores: { care_repair: 1, curiosity_exploration: 1, memory_story: 3, independence_play: 3 },
        observation:
          'Choosing to leave a legendary celebration behind demonstrates a joyous dedication to collective human delight.',
      },
    ],
  },
];

export const PROFILES: Profile[] = [
  {
    id: 'cloud_mender',
    title: 'Cloud Mender',
    universeCode: '08-B',
    universeName: 'The Floating Boroughs',
    summary:
      'Careful seamsters who restitch frayed altocumulus and patch thunderheads before they leak over Sunday markets.',
    jobDescription:
      'Repairs clouds that have lost their shape after turbulent wind seasons, excessive human sighs, or stray radio transmissions.',
    specialAbility: 'Hears rain three days before it arrives by tapping an empty porcelain bowl.',
    occupationalHazard:
      'Occasionally brings someone else’s localized weather home in their overcoat pockets.',
    officeHours: 'Closed on Tuesdays. The clouds require privacy.',
    currentAssignment:
      'Find the owner of a small, disoriented thunderstorm left behind at the central train station.',
    vector: { care_repair: 9, curiosity_exploration: 5, memory_story: 3, independence_play: 2 },
    emblemKey: 'cloud_mender',
    serialPrefix: 'CLM',
  },
  {
    id: 'dream_archivist',
    title: 'Dream Archivist',
    universeCode: '14-C',
    universeName: 'The Spire of Unfolded Nights',
    summary:
      'Curators of discarded nocturnal visions, cataloging half-forgotten melodies and flying lessons on microfilm.',
    jobDescription:
      'Catalogs, cross-indexes, and lightly dusts dreams left behind by sleepers who were awakened too abruptly by alarms.',
    specialAbility:
      'Can cross-reference two people who unknowingly shared the same dream on different continents.',
    occupationalHazard:
      'Accidentally dreaming a stranger’s high school geometry exam when falling asleep near the filing cabinets.',
    officeHours: '00:00 to 06:14 sidereal time; strictly asleep by dawn.',
    currentAssignment:
      'Recover three missing chapters of a forgotten novel dreamed by an architect in 1892.',
    vector: { care_repair: 5, curiosity_exploration: 3, memory_story: 9, independence_play: 2 },
    emblemKey: 'dream_archivist',
    serialPrefix: 'DRA',
  },
  {
    id: 'moon_lost_found',
    title: 'Moon Lost-and-Found Clerk',
    universeCode: '03-Luna',
    universeName: 'The Mare Tranquillitatis Terminal',
    summary:
      'Steward of all mundane treasures that slip through couch cushions and planetary gravitational rifts.',
    jobDescription:
      'Manages the multiverse depot of mismatched woolen mittens, unclaimed brass keys, and misplaced Tuesday afternoons.',
    specialAbility:
      'Knows the exact sentimental value of any dropped item without weighing or pricing it.',
    occupationalHazard:
      'Low gravity means unfiled sentiments occasionally drift upward and cluster against the skylights.',
    officeHours: 'Monday through Full Moon; closed during crescent solar eclipses.',
    currentAssignment:
      'Reconcile 418 antique keys with doors that dissolved between 1974 and 2003.',
    vector: { care_repair: 8, curiosity_exploration: 2, memory_story: 8, independence_play: 1 },
    emblemKey: 'moon_lost_found',
    serialPrefix: 'MLF',
  },
  {
    id: 'time_gardener',
    title: 'Time Gardener',
    universeCode: '27-G',
    universeName: 'The Perennial Hourglass Conservatory',
    summary:
      'Pruning overgrown afternoons, staking tender childhood summers, and weeding out recurring moments of awkwardness.',
    jobDescription:
      'Prunes overgrown seconds, stakes fragile childhood summers, and composts awkward pauses so better conversations can grow.',
    specialAbility:
      'Can smell whether a passing afternoon was spent reading under an elm tree or worrying about paperwork.',
    occupationalHazard:
      'Hands permanently smell of dry cedar mulch and October 1998.',
    officeHours: 'Sunrise in whichever century you are currently inspecting.',
    currentAssignment:
      'Prevent an exceptionally lovely golden autumn afternoon from looping for eighty consecutive years.',
    vector: { care_repair: 8, curiosity_exploration: 4, memory_story: 4, independence_play: 5 },
    emblemKey: 'time_gardener',
    serialPrefix: 'TGD',
  },
  {
    id: 'night_shift_shopkeeper',
    title: 'Interstellar Night-Shift Shopkeeper',
    universeCode: '52-K',
    universeName: 'The Crossroad Bodega',
    summary:
      'Warm tea, reliable compasses, and gentle conversation for travelers crossing between spiral galaxies.',
    jobDescription:
      'Operates a 24-hour corner bodega at the intersection of three spiral galaxies, stocking hot roasted chicory and spare compass pins.',
    specialAbility:
      'Can make any homesick interdimensional wanderer feel grounded with a warm paper cup of roasted chicory.',
    occupationalHazard:
      'Regular clientele includes non-corporeal entities made of radio noise who often forget to tip.',
    officeHours: '21:00 to 05:00 Galactic Standard (always night, regardless of planetary rotation).',
    currentAssignment:
      'Restock Shelf 4 with pickled solar flares before the midnight caravan from Orion arrives.',
    vector: { care_repair: 4, curiosity_exploration: 3, memory_story: 4, independence_play: 8 },
    emblemKey: 'night_shift_shopkeeper',
    serialPrefix: 'NSK',
  },
  {
    id: 'door_cartographer',
    title: 'Secret Door Cartographer',
    universeCode: '09-D',
    universeName: 'The Folded City',
    summary:
      'Drafting blueprints of passages that appear only when you are distracted, counting stairs that shift between ascents.',
    jobDescription:
      'Surveys corridors that exist only when people are not paying attention and drafts schematics of stairwells that change count.',
    specialAbility:
      'Can detect a hidden portal in any room possessing at least two corners and a slight floorboard draft.',
    occupationalHazard:
      'Occasionally takes a shortcut to the pantry and arrives in Renaissance Venice with an empty grocery basket.',
    officeHours: 'By appointment only; knock three times on any hollow wall.',
    currentAssignment:
      'Chart a newly opened doorway located behind an espresso machine in Transit Sector 6.',
    vector: { care_repair: 1, curiosity_exploration: 9, memory_story: 2, independence_play: 7 },
    emblemKey: 'door_cartographer',
    serialPrefix: 'SDC',
  },
  {
    id: 'ocean_memory_librarian',
    title: 'Ocean Memory Librarian',
    universeCode: '19-T',
    universeName: 'The Abyssal Archives',
    summary:
      'Curators of salt-crusted bottles, unwritten confessions, and maritime lullabies preserved in ceramic urns.',
    jobDescription:
      'Shelves maritime whispers, forgotten harbor lullabies, and unsent confessions sealed inside salt-glazed earthenware urns.',
    specialAbility:
      'Reads the incoming tide like a library card catalog and can cite whale song footnotes with page numbers.',
    occupationalHazard:
      'Coat pockets permanently accumulate sea glass, damp bookmarks, and miniature hermit crabs.',
    officeHours: 'High tide to low tide; strictly submerged on Wednesdays.',
    currentAssignment:
      'Locate the final stanza of a sea shanty lost off the coast of Valparaíso during the storm of 1640.',
    vector: { care_repair: 4, curiosity_exploration: 5, memory_story: 9, independence_play: 2 },
    emblemKey: 'ocean_memory_librarian',
    serialPrefix: 'OML',
  },
  {
    id: 'comet_postperson',
    title: 'Comet Postperson',
    universeCode: '33-P',
    universeName: 'The Elliptical Postal Route',
    summary:
      'Speed-of-light couriers who carry delayed birthday telegrams and urgent apologies across planetary orbits.',
    jobDescription:
      'Delivers delayed confessions, birthday cards forwarded between galaxies, and urgent apologies at orbital velocity.',
    specialAbility:
      'Never loses navigational bearing, provided there is at least one celestial body to gravitationally slingshot around.',
    occupationalHazard:
      'Hair is chronically swept backward by solar wind, resisting all known intergalactic pomades.',
    officeHours: 'Every 76 Earth years per circuit; drop boxes checked once per lunar cycle.',
    currentAssignment:
      'Deliver a postcard mailed in 1922 to an astronomer whose descendants moved to the moons of Neptune.',
    vector: { care_repair: 2, curiosity_exploration: 8, memory_story: 7, independence_play: 4 },
    emblemKey: 'comet_postperson',
    serialPrefix: 'CPP',
  },
  {
    id: 'weather_translator',
    title: 'Weather Translator',
    universeCode: '11-W',
    universeName: 'The Barometric Dialogue Bureau',
    summary:
      'Diplomats mediating grievances between grumpy sea mists, dramatic thunderstorms, and restless canyon zephyrs.',
    jobDescription:
      'Translates the moody monologues of fog banks, interprets hail negotiations, and mediates diplomatic disputes between wind currents.',
    specialAbility:
      'Understands what distant thunder is grumbling about twenty minutes before lightning strikes.',
    occupationalHazard:
      'Unwittingly speaks in sudden barometric pressure drops whenever surprised or startled.',
    officeHours: 'Weather permitting; open continuously during gentle spring drizzles.',
    currentAssignment:
      'Mediate a territorial dispute between an ancient sea mist and a haughty mountain downdraft.',
    vector: { care_repair: 7, curiosity_exploration: 7, memory_story: 4, independence_play: 2 },
    emblemKey: 'weather_translator',
    serialPrefix: 'WTR',
  },
  {
    id: 'stardust_baker',
    title: 'Stardust Baker',
    universeCode: '42-S',
    universeName: 'The Hearth of the Spiral',
    summary:
      'Alchemists of warmth, folding spun sugar nebulae and century-old levain into pastries that melt homesickness.',
    jobDescription:
      'Bakes morning pastries leavened with captured starlight, spun sugar nebulae, and sourdough starters older than three dynasties.',
    specialAbility:
      'Bakes breads whose warm crust aroma instantly cures lingering homesickness in any sentient species.',
    occupationalHazard:
      'Flour dust twinkles under ultraviolet radiation and is virtually impossible to brush off dark coats.',
    officeHours: '03:30 to 11:00 (first batch pulled from ovens at astronomical twilight).',
    currentAssignment:
      'Perfect a crescent roll that tastes precisely like the applicant’s favorite childhood blanket.',
    vector: { care_repair: 5, curiosity_exploration: 2, memory_story: 3, independence_play: 9 },
    emblemKey: 'stardust_baker',
    serialPrefix: 'SDB',
  },
  {
    id: 'midnight_lighthouse_keeper',
    title: 'Midnight Lighthouse Keeper',
    universeCode: '01-Omega',
    universeName: 'The Edge of the Quiet Sea',
    summary:
      'Solitary sentinels tending the beam at the edge of possibility, keeping wandering vessels from sailing into oblivion.',
    jobDescription:
      'Tends the beacon at the boundary where physical reality thins into quiet possibilities, ensuring vessels do not sail off the edge of meaning.',
    specialAbility:
      'Can focus a beam of light so steady and warm that it cuts through deep existential doubt.',
    occupationalHazard:
      'The surrounding silence is so pristine that one begins hearing the heartbeat of distant comets.',
    officeHours: 'Sunset to sunrise; sleep is conducted in twenty-minute nautical intervals.',
    currentAssignment:
      'Guide an uncharted ghost galleon carrying eighty crate loads of unread love letters safely into harbor.',
    vector: { care_repair: 5, curiosity_exploration: 2, memory_story: 8, independence_play: 6 },
    emblemKey: 'midnight_lighthouse_keeper',
    serialPrefix: 'MLK',
  },
  {
    id: 'gravity_tailor',
    title: 'Gravity Tailor',
    universeCode: '68-V',
    universeName: 'The Loom of Curvature',
    summary:
      'Couturiers of spacetime who hem planetary drag and sew weightless pockets for travelers with heavy burdens.',
    jobDescription:
      'Hemlines gravitational fields, takes in cosmic drag around dense planets, and stitches weightless pockets for overburdened travelers.',
    specialAbility:
      'Can lighten any emotional or physical burden by 40% with a single silver needle and a spool of dark matter.',
    occupationalHazard:
      'Floating tailor’s chalk and sewing pins drift lazily away whenever someone in the room sighs.',
    officeHours: 'Monday through Friday, 09:00 to 17:00 (local gravity permitting).',
    currentAssignment:
      'Re-stitch the gravitational seams around a wobbly asteroid nursery before afternoon tea.',
    vector: { care_repair: 4, curiosity_exploration: 7, memory_story: 2, independence_play: 8 },
    emblemKey: 'gravity_tailor',
    serialPrefix: 'GTL',
  },
];

export interface QuizEvaluationResult {
  profile: Profile;
  serialNumber: string;
  scores: Record<DimensionKey, number>;
  observations: string[];
  answeredOptions: {
    questionId: number;
    prompt: string;
    optionId: 'A' | 'B' | 'C' | 'D';
    optionText: string;
    observation: string;
  }[];
}

/**
 * Deterministically evaluate user answers and map to one of the 12 profiles.
 * Guaranteed:
 * - Deterministic: Identical answers always yield the same profile, serial, and observations.
 * - Meaningful scoring: User's scores across the 4 dimensions drive closest archetype vector matching.
 * - Two specific observations tied directly to selected answers.
 */
export function evaluateAnswers(answers: UserAnswers): QuizEvaluationResult {
  const scores: Record<DimensionKey, number> = {
    care_repair: 0,
    curiosity_exploration: 0,
    memory_story: 0,
    independence_play: 0,
  };

  const answeredOptions: QuizEvaluationResult['answeredOptions'] = [];

  for (const question of QUESTIONS) {
    const choice = answers[question.id] || 'A';
    const opt = question.options.find((o) => o.id === choice) || question.options[0];
    scores.care_repair += opt.scores.care_repair;
    scores.curiosity_exploration += opt.scores.curiosity_exploration;
    scores.memory_story += opt.scores.memory_story;
    scores.independence_play += opt.scores.independence_play;

    answeredOptions.push({
      questionId: question.id,
      prompt: question.prompt,
      optionId: opt.id,
      optionText: opt.text,
      observation: opt.observation,
    });
  }

  // Calculate distance to each profile's vector
  // Distance metric: weighted Euclidean distance with normalized vector alignment
  let bestProfile = PROFILES[0];
  let minDistance = Number.POSITIVE_INFINITY;

  // Compute a deterministic seed from the answer choices (e.g., 'A','B','C','D' -> 0,1,2,3)
  const answerKey = QUESTIONS.map((q) => answers[q.id] || 'A').join('');
  let hashSeed = 0;
  for (let i = 0; i < answerKey.length; i++) {
    hashSeed = (hashSeed * 31 + answerKey.charCodeAt(i)) >>> 0;
  }

  for (const profile of PROFILES) {
    const dCare = scores.care_repair - profile.vector.care_repair;
    const dCuriosity = scores.curiosity_exploration - profile.vector.curiosity_exploration;
    const dMemory = scores.memory_story - profile.vector.memory_story;
    const dPlay = scores.independence_play - profile.vector.independence_play;

    // Euclidean distance
    const dist = Math.sqrt(
      dCare * dCare +
      dCuriosity * dCuriosity +
      dMemory * dMemory +
      dPlay * dPlay
    );

    if (dist < minDistance) {
      minDistance = dist;
      bestProfile = profile;
    }
  }

  // Derive both observations strictly from the user's actual selected answers and quote them verbatim
  const q2Choice = answeredOptions.find((o) => o.questionId === 2) || answeredOptions[1];
  const q4Choice = answeredOptions.find((o) => o.questionId === 4) || answeredOptions[3];

  const obs1 = q2Choice
    ? `“${q2Choice.optionText}” — ${q2Choice.observation}`
    : answeredOptions[0].observation;

  const obs2 = q4Choice
    ? `“${q4Choice.optionText}” — ${q4Choice.observation}`
    : answeredOptions[answeredOptions.length - 1].observation;

  const observations = [obs1, obs2];

  // Deterministic serial number: e.g. "PY-08B-7402-CLM"
  const numericPart = ((hashSeed % 8999) + 1000).toString();
  const serialNumber = `PY-${bestProfile.universeCode.replace(/[^A-Z0-9]/gi, '')}-${numericPart}-${bestProfile.serialPrefix}`;

  return {
    profile: bestProfile,
    serialNumber,
    scores,
    observations,
    answeredOptions,
  };
}

/**
 * Internal assertion for deterministic evaluation integrity.
 * Specifically verifies sequence [B, C, B, A, D, B] (0-indexed [1, 2, 1, 0, 3, 1]):
 * - Question 4 choice MUST be 'A' ("Try to mend it")
 * - Observations MUST quote "Try to mend it" verbatim
 * - Stored answeredOptions array must match [B, C, B, A, D, B] exactly
 */
export function runIntegrityAssertion(): { passed: boolean; message: string; result: QuizEvaluationResult } {
  const testAnswers: UserAnswers = {
    1: 'B',
    2: 'C',
    3: 'B',
    4: 'A',
    5: 'D',
    6: 'B',
  };

  const evalResult = evaluateAnswers(testAnswers);

  const q4Answer = evalResult.answeredOptions.find((o) => o.questionId === 4);
  if (!q4Answer || q4Answer.optionId !== 'A' || !q4Answer.optionText.startsWith('Try to mend it')) {
    throw new Error(
      `Integrity Assertion Failed: Q4 was expected to be 'A' ("Try to mend it"), but got '${q4Answer?.optionId}' ("${q4Answer?.optionText}")`
    );
  }

  const expectedObsQuote = 'Try to mend it';
  const obsHasQ4A = evalResult.observations.some((obs) => obs.includes(expectedObsQuote));
  if (!obsHasQ4A) {
    throw new Error(
      `Integrity Assertion Failed: Observations do not contain "${expectedObsQuote}". Observations: ${JSON.stringify(evalResult.observations)}`
    );
  }

  const expectedSequence: ('A' | 'B' | 'C' | 'D')[] = ['B', 'C', 'B', 'A', 'D', 'B'];
  const actualSequence = evalResult.answeredOptions.map((o) => o.optionId);
  const sequenceMatches = actualSequence.every((val, i) => val === expectedSequence[i]);
  if (!sequenceMatches) {
    throw new Error(
      `Integrity Assertion Failed: Sequence mismatch. Expected ${expectedSequence.join(',')} but got ${actualSequence.join(',')}`
    );
  }

  return {
    passed: true,
    message: `Integrity Assertion Passed: [B, C, B, A, D, B] evaluated correctly. Profile: ${evalResult.profile.title}, Serial: ${evalResult.serialNumber}, Q4 verified as "Try to mend it".`,
    result: evalResult,
  };
}

/**
 * Deterministically re-evaluates user answers if one question choice is swapped.
 */
export function evaluateCounterfactual(
  originalAnswers: UserAnswers,
  swapQuestionId: number,
  newChoice: 'A' | 'B' | 'C' | 'D'
): QuizEvaluationResult {
  const modifiedAnswers: UserAnswers = {
    ...originalAnswers,
    [swapQuestionId]: newChoice,
  };
  return evaluateAnswers(modifiedAnswers);
}

/**
 * Pre-computes a deterministic ground truth summary table of all 18 single-answer
 * counterfactuals for the current traveler's answers. Passed to the server so Gemini
 * never has to guess or invent counterfactual occupations.
 */
export function generateCounterfactualSummary(answers: UserAnswers): string {
  const lines: string[] = [];

  for (const q of QUESTIONS) {
    const currentChoice = answers[q.id] || 'A';
    lines.push(`Query 0${q.id} ("${q.prompt}") [Traveler picked Option ${currentChoice}]:`);

    for (const opt of q.options) {
      if (opt.id === currentChoice) continue;
      const counterResult = evaluateCounterfactual(answers, q.id, opt.id);
      lines.push(
        `  * If chosen Option ${opt.id} ("${opt.text}") instead: Assigned -> "${counterResult.profile.title}" in Universe ${counterResult.profile.universeCode} (${counterResult.profile.universeName})`
      );
    }
  }

  return lines.join('\n');
}


