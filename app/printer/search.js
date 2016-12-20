import BasePrinter from './base';

export default class SearchPrinter extends BasePrinter {

    constructor(options) {
        super(options);

        this.predicate = options.predicate;
    }

    showEpisodes(episodes, podcast) {
        episodes = episodes.filter(this.predicate);

        if (episodes.length === 0) {
            this.logger.warning('No match found.');
        } else {
            this.logger.success(`Found ${episodes.length} episode(s).`);
        }

        super.showEpisodes(episodes, podcast);
    }
}