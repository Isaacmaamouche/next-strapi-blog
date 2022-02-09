export default function Loading() {
  return (
    <div className="d-flex justify-content-center my-5 fullPageUnload">
      <div className="spinner-grow red-grow" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
