import React from 'react'
import BookModal from './BookModal';

const Book = ({ book1 }) => {
    const {title, thumbnail, authors, price} = book1;
    return (
        <tr>
            <td><img src={thumbnail ? thumbnail: "http://via.placeholder.com/170x250"} width={30}/></td>
            <td>{title}</td>
            <td>{authors}</td>
            <td>{price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</td>
            <td><BookModal book={book1} /></td>
        </tr>
    )
}

export default Book