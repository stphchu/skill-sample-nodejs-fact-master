/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk');

const GetNewFactHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest'
      || (request.type === 'IntentRequest'
        && request.intent.name === 'GetNewFactIntent');
  },
  handle(handlerInput) {
    const factArr = data;
    const factIndex = Math.floor(Math.random() * factArr.length);
    const randomFact = factArr[factIndex];
    const speechOutput = GET_FACT_MESSAGE + randomFact;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .withSimpleCard(SKILL_NAME, randomFact)
      .getResponse();
  },
};

const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(HELP_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, an error occurred.')
      .reprompt('Sorry, an error occurred.')
      .getResponse();
  },
};

const SKILL_NAME = 'Cat Facts';
const GET_FACT_MESSAGE = 'Here\'s your fact: ';
const HELP_MESSAGE = 'You can say tell me a cat fact, or, you can say exit. What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

const data = [
        'A cat\'s field of vision is about 200 degrees.',
        'Cats are unable to detect sweetness in anything they taste.',
        'The two outer layers of a cat\'s hair are called, respectively, the guard hair and the awn hair.',
        'Cats\' pregnancies last about nine weeks.',
        'Cats greet one another by rubbing their noses together.',
        'Cats have two vocal chords, and can make over 100 sounds.',
        'Cats respond most readily to names that end in an "ee" sound.',
        'A fingerprint is to a human as a nose is to a cat.',
        'Cats use their whiskers to measure openings, indicate mood and general navigation.',
        'Genetically, cats\' brains are more similar to that of a human than a dog\'s brain.',
        'The collective nouns used for cats and kittens are a clowder of cats and a kindle of kittens.',
        'A cat\'s heart beats almost double the rate of a human heart, from 110 to 140 beats per minute.',
        'Cats show affection and mark their territory by rubbing on people. Glands on their face, tail and paws release a scent to make its mark.',
        'A cat\'s meow is usually not directed at another cat, but at a human. To communicate with other cats, they will usually hiss, purr and spit.',
        'Cats came to the Americas from Europe as pest controllers in the 1750s.',
        'Teeth of cats are sharper when they\'re kittens. After six months, they lose their needle-sharp milk teeth.',
        'A domestic cat can run up to 30 mph in a short spurt.',
        'A cat can jump up to 5 times its own height.',
        'The cause of allergy to cats is a protein called \'Fel d 1\' emanating from sebum found in the sebaceous glands of cats. The protein attaches itself to dried skin, called dander, that flakes off and floats through the air when cats wash themselves.',
        'Sir Isaac Newton is credited with the creation of the cat flap, because his experiments kept being interrupted by his own cat coming through the door.',
        'Cats can drink sea water because their kidneys are able to filter salt out of water.',
        'Contrary to popular belief, cats shouldn’t be given milk to drink because they are usually lactose intolerant.',
        'In warm weather cats lick their fur to cool themselves down, whereas in colder weather they do it to smooth their fur down to provide more insulation.',
        'Acoustic Kitty was a CIA project launched by the Central Intelligence Agency Directorate of Science & Technology, which in the 1960s intended to use cats to spy on the Kremlin and Soviet embassies.',
        'A cat\'s hairball is technically known as a \'trichobezoar\'. \'Tricho\' means hair and a \'bezoar\' is a lump formed from material unable to digest in the digestible tract. Bezoars were once thought to possess certain magical properties by acting as an antidote to some poisons.',
        'In ancient Egypt, cats were believed to be magical creatures, capable of bringing good luck to the people who housed them. When the cats died, they were mummified; as a sign of mourning, the cat owners shaved off their eyebrows, and continued to mourn until their eyebrows grew back.',
        'Cats domesticated themselves, essentially by choosing proximity to people as their survival strategy, and then proceeded to infect one in three humans on Earth with a parasite called Toxoplasma gondii, which affects our behavior in ways that are still not entirely understood, although there is speculation that one of the symptoms might be an attraction to cats.',
        'When cats fall, a mechanism in their inner ear causes their head, neck, and backbone to rotate into a position that will help them land on their feet.',
        'A 2017 study found that most cats preferred interacting with an unfamiliar human over eating their favorite treat, playing with their favorite toy, or smelling their favorite scent.',
        'A cat\'s normal body temperature can range from 100.5 to 102.5 degrees fahrenheit.',
        'Cats\' tongues are covered in little barbs called \"papillae\" which are made of keratin, just like human fingernails',
        'Cats groom for several reasons: in addition to detangling their fur, it removes parasites and their eggs, and it also redistributes oils produced by the cat\'s skin that provide the fur with some waterproofing.',
        'When drinking, cats place their tongue on the water surface and then lift the tip of their tongue very rapidly to create a column of water; the cat bites the column at just the right moment to get as much water as possible while also keeping its face dry.',
        'If a cat rolls over and exposes its belly to you, that means it trusts you completely.',
];

const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
  .addRequestHandlers(
    GetNewFactHandler,
    HelpHandler,
    ExitHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
