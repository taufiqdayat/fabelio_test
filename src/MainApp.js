import React, { Component } from 'react';
import 'react-notifications/lib/notifications.css';
import {connect} from 'react-redux';
import {getListProduct} from './redux/actions';

class MainApp extends Component {

    constructor(props){
        super(props);
        this.state = {
            searchValue:""
        }

        this.props.getListProduct();
    }

    render() {
        const {list_product} = this.props;

        return (
            <div className="container">
                <div className="card text-white bg-primary" style={{marginTop:"50px", padding:"20px"}}>
                    <div className="row">
                        <div className="col-sm-6">
                            <input type="text" placeholder="Search Furniture" className="form-control" value={this.state.searchValue} onChange={(e)=>this.setState({searchValue:e.target.value})} style={{width:"100%"}} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            Filter style
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
    const {list_product} = prod;
    return {list_product}
}

export default connect(mtp, {getListProduct}) (MainApp);