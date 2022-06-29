import React, { useEffect, useState } from 'react'
import { Box, Container, Grid } from '@mui/material';

import { useLocation } from 'react-router-dom';
import { getProducts,searchProducts } from '../service/Product';
import Products from './Products';
import ReactPaginate from 'react-paginate';
import '../App.css'

export default function Paginationpages() {
    const [proData,setProData]=useState([])
    const [currentProducts, setCurrentProducts] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage=3
    
    useEffect(()=>{
        getProducts()
        .then(res=>setProData(res.data.prodata))
        .catch(err=>console.log(err)) 
    },[]) 

    const location=useLocation();
    useEffect(()=>{
        searchProducts(location.search)
        .then(res=>{
            if(res.data.err==0){
                setProData(res.data.prodata)
            }
        })
    },[location.search])

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentProducts(proData.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(proData.length / itemsPerPage));
    }, [itemOffset, itemsPerPage,proData]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % proData.length;
        setItemOffset(newOffset);
    };
  return (
   <Container>
     <Box sx={{ flexGrow: 1, margin: "20px 0px" }}>
        <Grid container spacing={3}>
            <Products products={currentProducts}/>
        </Grid>
    </Box>

    <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName='page-num'
        previousLinkClassName='page-num'
        nextLinkClassName='page-num'
        activeLinkClassName='active'
      />
 
   </Container>
  )
}