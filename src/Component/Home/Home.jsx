import React, { useState } from 'react';
import Banner from './Banner';

import FeaturedProperties from './FeaturedProperties';
import ExploreCategories from './ExploreCategories';
import WhyChoose from './WhyChoose';
import Opportunities from './Oppurtunities';

const Home = () => {
    const [showOpportunities, setShowOpportunities] = useState(true);
    
    const handleSkipOpportunities = () => {
        setShowOpportunities(false);
    };
    
    const handleShowProperties = () => {
        setShowOpportunities(false);
    };

    return (
        <div>
            <Banner />
            {showOpportunities && (
                <Opportunities 
                    onSkip={handleSkipOpportunities}
                    onShowProperties={handleShowProperties}
                />
            )}
            <FeaturedProperties />
            <ExploreCategories />
            <WhyChoose />
        </div>
    );
};

export default Home;