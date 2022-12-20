import React from 'react'

//styles
import styles from './style/style.module.scss'

const services = [
    {
        image_url: '/icons/ic-umbrella.png',
        name: 'Bảo hiểm nhân thọ',
        total_product: 126,
        link_url: '#'
    },
    {
        image_url: '/icons/ic-umbrella.png',
        name: 'Bảo hiểm sức khỏe',
        total_product: 53,
        link_url: '#'
    },
    {
        image_url: '/icons/ic-umbrella.png',
        name: 'BH bệnh hiểm nghèo',
        total_product: 13,
        link_url: '#'
    },
    {
        image_url: '/icons/ic-umbrella.png',
        name: 'Bảo hiểm du lịch',
        total_product: 87,
        link_url: '#'
    },
    {
        image_url: '/icons/ic-umbrella.png',
        name: 'Bảo hiểm nhà',
        total_product: 4,
        link_url: '#'
    },
    {
        image_url: '/icons/ic-umbrella.png',
        name: 'Bảo hiểm ô tô',
        total_product: 18,
        link_url: '#'
    },
    {
        image_url: '/icons/ic-umbrella.png',
        name: 'Vay tín dụng',
        total_product: 139,
        link_url: '#'
    },
    {
        image_url: '/icons/ic-umbrella.png',
        name: 'Vay mua ô tô',
        total_product: 65,
        link_url: '#'
    },
    {
        image_url: '/icons/ic-umbrella.png',
        name: 'Thẻ tín dụng',
        total_product: 210,
        link_url: '#'
    },
    {
        image_url: '/icons/ic-umbrella.png',
        name: 'Vay mua nhà',
        total_product: 77,
        link_url: '#'
    },
    {
        image_url: '/icons/ic-umbrella.png',
        name: 'Vay thế chấp',
        total_product: 510,
        link_url: '#'
    },
    {
        image_url: '/icons/ic-umbrella.png',
        name: 'Gửi tiết kiệm',
        total_product: 41,
        link_url: '#'
    }
]

const CategoryList = React.memo(function CategoryList({data}) {

    return (
        <div className={`container ${styles.container}`}>
            <h2 className={styles.title} style={{borderColor: data?.borderColor}}>{data?.title}</h2>
            {
                data?.actionList?.length > 0 &&
                <div className={`d-flex flex-wrap ${styles.imageListContainer}`}>
                    {
                        data?.actionList?.map((item, index) => {
                            return (
                                <a href={item?.link_url} className={styles.imageContainer} key={index}>
                                    <div className={`${styles.image} background-image`} style={{backgroundImage: `url('${item?.image_url}')`}} />
                                </a>
                            )
                        })
                    }
                </div>
            }
        </div>
    )
})

export default React.memo(CategoryList)