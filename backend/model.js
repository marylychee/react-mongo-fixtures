import mongoose from 'mongoose';
const { Schema } = mongoose;

const fixtureSchema = new Schema({
    fixtureMid: String,
    season: Number,
    competitionName: String,
    fixtureDatetime: { type: Date, default: Date.now },
    fixtureRound: Number,
    homeTeam: String,
    awayTeam: String, 
});

const Fixtures = mongoose.model('fixtures', fixtureSchema);

export default Fixtures;