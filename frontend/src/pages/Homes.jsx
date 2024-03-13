import Header from '../components/layout/Header'
import AfterHeader from "../components/layout/AfterHeader"
import CircleComponent from "../components/CircleComponent"
import bussinessMap from '../images/bussiness.map.png'

function Homes() {
  return (
    <div>
      <Header />
      <AfterHeader />
      <div className="container-info">
        <hr className="small" />
        <h2 className="heading">Massage Therapy By Deirdre</h2>
        <div className="circle-info">
          <CircleComponent 
            title="Domestic Cleaning" 
            image="https://images.pexels.com/photos/4107109/pexels-photo-4107109.jpeg?auto=compress&cs=tinysrgb&w=800" 
            borderColor="rgb(8, 162, 223)"
            content="The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested."
          />
          <CircleComponent 
            title="Commercial Cleaning" 
            image="https://images.pexels.com/photos/6627534/pexels-photo-6627534.jpeg?auto=compress&cs=tinysrgb&w=800" 
            borderColor="rgb(145, 195, 212)"
            content="The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested."
          />
          <CircleComponent 
            title="Inner window cleaning" 
            image="https://images.pexels.com/photos/4440540/pexels-photo-4440540.jpeg?auto=compress&cs=tinysrgb&w=800"
            borderColor="rgb(175, 128, 169)"
            content="The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested."
          />
          <CircleComponent 
            title="Afterbuild cleaning" 
            image="https://media.istockphoto.com/id/1162610977/photo/female-carpenter-using-broom.jpg?s=1024x1024&w=is&k=20&c=gi0fzaC9VCaixsRnoOGgsNFIzCe-LcPh5GUbA0sUuE0="
            borderColor="rgb(196, 72, 175)"
            content="The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested."
          />
        </div>
      </div>
      <div style={{width: '100%', height: '400px'}}>
        <div className="bussiness-map">
          <img 
            src={bussinessMap} 
            alt="Map of bussiness address" 
            width="100%"
            height="100%"
          />
        </div>
      </div>
    </div>
  )
}

export default Homes
