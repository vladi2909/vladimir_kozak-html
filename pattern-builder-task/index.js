const HomeSettings = require('./home-settings');

const home = HomeSettings.getBuilder()
    .addRoof('gable')
    .addFloor(2)
    .addBasement(true) 
    .build();
