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

const Fixture = mongoose.model('fixture', fixtureSchema);

export default Fixture;