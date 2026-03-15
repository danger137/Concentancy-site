export default function BlogLoading() {
    return (
        <>
            <section id="center" className="center_o p_3 bg_blue" style={{ height: '200px' }}>
                <div className="container-xl h-100 d-flex align-items-center">
                    <div className="skeleton-text w-25" style={{ height: '40px', background: 'rgba(255,255,255,0.1)' }}></div>
                </div>
            </section>

            <section className="p_3">
                <div className="container-xl">
                    <div className="row">
                        <div className="col-md-8">
                            {[1, 2].map((i) => (
                                <div key={i} className="border_1 rounded-3 p-3 mb-4 shadow-sm">
                                    <div className="rounded mb-3" style={{ height: '350px', background: '#eee' }}></div>
                                    <div className="mb-2 w-25" style={{ height: '20px', background: '#eee' }}></div>
                                    <div className="mb-3 w-75" style={{ height: '32px', background: '#eee' }}></div>
                                    <div className="w-100" style={{ height: '60px', background: '#eee' }}></div>
                                </div>
                            ))}
                        </div>
                        <div className="col-md-4">
                            <div className="border_1 rounded-3 p-3 shadow-sm">
                                <div className="mb-3 w-50" style={{ height: '28px', background: '#eee' }}></div>
                                <div className="w-100" style={{ height: '45px', background: '#eee' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
