import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Paginate from './../components/Paginate';
import SearchBox from './../components/SearchBox';
import TableCrud from './../components/TableCrud';
import Loader from './../components/Loader';
import Message from './../components/Message';
import { Route } from 'react-router-dom';
import { listProducts, createProduct } from './../actions/productActions';
import HeaderContent from '../components/HeaderContent';
import  Modal  from 'react-modal';
import Input from '../components/form/Input';
import Select from '../components/form/Select';
import { allCategories } from './../actions/categoryActions';
import { customStyles } from '../utils';
import ModalButton from '../components/ModalButton';


Modal.setAppElement('#root')

const ProductScreen = ({history, match}) => {

    const keyword = match.params.keyword || ''
    const pageNumber = match.params.pageNumber || 1

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [stock, setStock] = useState(0)
    const [category, setCategory] = useState(1)

    const [errors, setErrors] = useState({})

    const dispatch = useDispatch()


    //categories state
    const categoryAll = useSelector(state => state.categoryAll)
    const {loading: loadingCategories, error: errorCategories, categories} = categoryAll

    const productList = useSelector((state) => state.productList)
    const {loading, error, products, page, pages} = productList

    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin

    const productCreate = useSelector((state) => state.productCreate)
    const {loading: createLoading, success: createSuccess ,error: createError} = productCreate

    useEffect(() => {
        dispatch(listProducts(keyword,pageNumber))
        dispatch(allCategories())
    }, [dispatch, history, userInfo, pageNumber, keyword, createSuccess])

    const handleSubmit = (e) => {
      
        e.preventDefault();

        let errorsCheck = {}

        if(!name){
          errorsCheck.name = 'Name is required'
        }
        if(!price){
          errorsCheck.price = 'Price is required'
        }
        
        if(!stock){
          errorsCheck.stock = 'Stock is required'
        }
        if(!category){
          errorsCheck.category = 'Category is required'
        }



      if(Object.keys(errorsCheck).length > 0){
        setErrors(errorsCheck)
      }else{
        setErrors({})
      }
      
      if(Object.keys(errorsCheck).length === 0){
        
        const product = {
          name: name,
          price: price,
          stock: stock,
          category: category
        }
        
        
        dispatch(createProduct(product))
  
         setName('')
         setPrice(0)
         setStock(0)
         setCategory(1)
        
  
        setModalIsOpen(false)
      }
    }

    return ( 
        <>
        <HeaderContent name={'Products'} />
          {/* Main content */}
          
          <section className="content">
            <div className="container-fluid">
              <ModalButton modal={modalIsOpen} setModal={setModalIsOpen} classes={'btn-success btn-lg mb-2'} />
              <Modal style={customStyles} isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                <h2>Create Form</h2>
                <form onSubmit={handleSubmit}>
                  <Input name={'name'} type={'text'} data={name} setData={setName} errors={errors}/>
                  <Input name={'price'} type={'number'} data={price} setData={setPrice} errors={errors}/>
                  <Input name={'stock'} type={'number'} data={stock} setData={setStock} errors={errors}/>
                  <Select setData={setCategory} items={categories} loading={loadingCategories} error={errorCategories} />
                  

                  <hr/>
                  <button type="submit" className="btn btn-primary">Submit</button>
                  
                  <ModalButton modal={modalIsOpen} setModal={setModalIsOpen} classes={'btn-danger float-right'} />

                </form>
              </Modal>

              <div className="row">
                <div className="col-12">
        
                  <Loader variable={createLoading} />
                  <Message message={createError} color={'danger'}/>
                  <Route render={({history}) => <SearchBox history={history} item={'product'}/>} />
                  
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">Products table</h3>
                    </div>
                    {/* /.card-header */}
                    <div className="card-body table-responsive p-0">
                      {loading 
                      ? 
                      <Loader variable={loading} /> 
                      : error 
                      ? 
                      <Message message={error} color={'danger'} />
                      : (
                      <>
                      <TableCrud  data={products} itemLink={'product'}/>
                      
                      <Paginate 
                            item={'product'}
                            pages={pages} 
                            page={page} 
                            keyword={keyword ? keyword : null} />
                      </>
                      )}
                    </div>
                    {/* /.card-body */}
                  </div>
        
                </div>
                {/* /.col */}
              </div>
              {/* /.row */}
            </div>
            {/* /.container-fluid */}
          </section>
        
        
                </>
     );
}
 
export default ProductScreen;