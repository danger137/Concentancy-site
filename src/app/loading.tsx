export default function Loading() {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '70vh' }}>
            <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <h4 className="mt-4 col_blue fw-bold">Infinity Overseas Consultants</h4>
            <p className="text-muted">Preparing your experience...</p>
        </div>
    );
}
