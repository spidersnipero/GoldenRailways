export default function TrainCard(props){
    return(
        <div className="card m-3" style={{minWidth:"30%"}}>
            <div className="card-body" id={props.train.id}>
                <h5 className="card-title text-primary">{props.train.name}</h5>
                <p className="card-text text-secondary">Current location :<span className="text-info ">{props.train.location}</span> </p>
                <p className="card-text text-secondary">Available seats : {props.train.available}</p>
            </div >
        </div>
    )
}