        _vsrkpd.d = null;

if( _vsrkpd.d ) {
        _vsrkpd.write_numdata('rkpd_Ch4Nmlj_NlFOJQDy', _vsrkpd.d, 3600);
    _vsrkpd.rewrite_document();
} else {
    _vsrkpd._ds.parseDomForNumbers();
    _vsrkpd.getnum_error( 'rewrite not found' );
}

