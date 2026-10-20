
import styles from "../page.module.css";

export default function Home() {
  return (
    <>
      <section className="p-5 mb-4 bg-light rounded-3 banner">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">
            Eventos
          </h1>

          <p className="col-md-8 fs-4">
            
          </p>
        </div>
      </section>

      <div className="card" style={{ width: "18rem" }}>
        <img
          className="card-img-top"
          src="https://placehold.co/286x180"
          alt="Imagem ilustrativa do card"
        />

        <div className="card-body">
          <h5 className="card-title">Card title</h5>

          <p className="card-text">
            Some quick example text to build on the card title
            and make up the bulk of the card's content.
          </p>

          <a href="#" className="btn btn-primary">
            Go somewhere
          </a>
        </div>
      </div>
    </>
  );
}
