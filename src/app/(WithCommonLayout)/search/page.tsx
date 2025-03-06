import Filter from '@/components/Shared/Filter';
import { getAllReview } from '@/services/Review';
import React from 'react';

const SearchPage = async() => {
      const { data: review } = await getAllReview();
    return (
        <div >
            <Filter review={review}/>
        </div>
    );
};

export default SearchPage;