export default function AboutLoading() {
    return (
        <>
            <section id="center" className="center_o p_3 bg_blue" style={{ height: '200px' }}>
                <div className="container-xl h-100 d-flex align-items-center">
                    <div className="skeleton-text w-25" style={{ height: '40px', background: 'rgba(255,255,255,0.1)' }}></div>
                </div>
            </section>

            <section className="p_3">
                <div className="container-xl">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <div className="rounded w-100" style={{ height: '400px', background: '#eee' }}></div>
                        </div>
                        <div className="col-md-6 ps-md-5 pt-4">
                            <div className="mb-3 w-25" style={{ height: '20px', background: '#eee' }}></div>
                            <div className="mb-4 w-75" style={{ height: '40px', background: '#eee' }}></div>
                            <div className="mb-3 w-100" style={{ height: '20px', background: '#eee' }}></div>
                            <div className="mb-3 w-100" style={{ height: '20px', background: '#eee' }}></div>
                            <div className="mb-3 w-100" style={{ height: '20px', background: '#eee' }}></div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
