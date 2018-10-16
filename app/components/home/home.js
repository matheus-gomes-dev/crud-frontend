import React from 'react';
import Modal from '../modal/modal';
import Table from '../table/table';
import MarginDiv from './homeStyle';
import { getProductsInfo, deleteProduct } from '../../utils/api';

const renderHome = () => (
  <div>
    <MarginDiv>
      <Modal title="Register new product" />
    </MarginDiv>
    <MarginDiv>
      <Table getProductsInfo={getProductsInfo} deleteProduct={deleteProduct} />
    </MarginDiv>
    {/* <MarginDiv>
      <Pagination pages={totalPages} currentPage={currentPage} />
    </MarginDiv> */}
  </div>
);

export default renderHome;
