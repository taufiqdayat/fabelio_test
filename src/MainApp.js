import React, { Component } from 'react';
import 'react-notifications/lib/notifications.css';
import {connect} from 'react-redux';
import { IoIosSearch } from "react-icons/io";
import {getListProduct, searchListProduct, changeFilterProdStyle} from './redux/actions';
import { Button, Accordion, useAccordionToggle, Card } from 'react-bootstrap';

class MainApp extends Component {

    constructor(props){
        super(props);
        this.state = {
            searchValue:"",
            coba:false,
        }

        this.props.getListProduct();
    }

    doSearch(){
        if(this.state.searchValue==""){
            this.props.getListProduct();
        }else{
            this.props.searchListProduct(this.state.searchValue);
        }
    }

    render() {
        const {list_product, furniture_styles, changeFilterProdStyle} = this.props;

        return (
            <div className="container">
                <div className="card text-white bg-primary" style={{marginTop:"50px", padding:"20px"}}>
                    <div className="row">
                        <div className="col-10 col-sm-6">
                            <input type="text" placeholder="Search Furniture" className="form-control" value={this.state.searchValue} onChange={(e)=>this.setState({searchValue:e.target.value})} style={{width:"100%"}} />
                        </div>
                        <div className="col-2 col-sm-2">
                            <Button variant="success" onClick={()=>this.doSearch()}>
                                <IoIosSearch />
                            </Button>
                        </div>
                    </div>
                    <div className="row" style={{marginTop:"30px"}}>
                        <div className="col-sm-6">
                        <Accordion defaultActiveKey="1">
                            <Card>
                                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                    Furniture Style
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                <div className="container" style={{color:"#212529"}}>
                                {
                                    furniture_styles.length>0
                                    &&
                                    furniture_styles.map((styl, idx)=>(
                                        <div key={idx} style={{borderBottom:"1px solid #ccc", padding:"7px 0px", display:"flex", justifyContent:"space-between"}}>
                                            <b>{styl.name}</b>
                                            <input 
                                                type="checkbox" 
                                                onChange={(e)=>{
                                                    furniture_styles[idx].select = e.target.checked;
                                                    changeFilterProdStyle(furniture_styles);
                                                }} 
                                                checked={styl.select} 
                                            />
                                        </div>
                                    ))
                                }
                                </div>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                        </div>
                        <div className="col-sm-6">
                            filter Delivery time
                        </div>
                    </div>
                </div>
                <div className="row">
                {
                    list_product.length>0
                    &&
                    list_product.map((row, idx)=>(
                       <div className="col-sm-6" key={idx}>
                            <div className="card" style={{padding:"20px", marginTop:"50px"}}>
                                <div style={{display:"flex", justifyContent:"space-between"}}>
                                    <h6><b>{row.name}</b></h6>
                                    <p style={{color:"#ffad3b"}}><b>Rp. {row.price}</b></p>
                                </div>
                                <div>
                                    <p>{row.description.substring(0,144)}...</p>    
                                </div>
                                <div style={{display:"flex", justifyContent:"space-between"}}>
                                    <div>
                                        {
                                            row.furniture_style.map(style=>(
                                                <div key={style} style={{color:"#639edb"}}>{style}</div>
                                            ))
                                        }
                                    </div>
                                    <div>
                                        <b style={{color:"#2477cc"}}>{row.delivery_time}</b>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
                </div>
            </div>
        );
    }
}

const mtp = ({prod}) => {
    const {list_product, furniture_styles} = prod;
    return {list_product, furniture_styles}
}

export default connect(mtp, {getListProduct, searchListProduct, changeFilterProdStyle}) (MainApp);