export default function TeamLoading() {
    return (
        <>
            <section id="center" className="center_o p_3 bg_blue skeleton-header" style={{ height: '200px' }}>
                <div className="container-xl h-100 d-flex align-items-center">
                    <div className="skeleton-text w-25" style={{ height: '40px', background: 'rgba(255,255,255,0.1)' }}></div>
                </div>
            </section>

            <section className="p_3 bg-light">
                <div className="container-xl">
                    <div className="row">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="col-md-4 mb-5">
                                <div className="bg-white rounded overflow-hidden shadow-sm p-4 h-100">
                                    <div className="rounded-circle mx-auto mb-4" style={{ width: '150px', height: '150px', background: '#eee' }}></div>
                                    <div className="mx-auto mb-2 w-75" style={{ height: '24px', background: '#eee' }}></div>
                                    <div className="mx-auto mb-3 w-50" style={{ height: '16px', background: '#eee' }}></div>
                                    <div className="mx-auto w-100" style={{ height: '60px', background: '#eee' }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
