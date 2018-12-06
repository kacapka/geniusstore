import React from 'react';

const RenderCommonProducts = ({products, onThumbnailClick}) => {

    return (
        <div id='commonPhotosWrap'>
            <div id='commonTitle'>Dostepne kolory</div>
            <div id='commonPhotos'>
                {products.map(product => {
                    return (
                        <div className='thumbnail-wrap' key={product._id}
                             onClick={() => onThumbnailClick(product._id)}
                        >
                            <img src={product.mainPhoto} className='photo-thumbnail' />
                        </div>
                    );
                })}
            </div>
        </div>
    )

};

export default RenderCommonProducts;