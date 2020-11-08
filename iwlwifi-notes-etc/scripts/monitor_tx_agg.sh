#!/usr/bin/awk -f

# script to monitor TX aggregation issues with iwlwifi or iwlagn
#
# use: sudo tail -f -n 1000 /var/log/messages | <this awk script>
#
# edit 'wlp3s0' if it is not your wireless device
# edit 'iwlwifi' if you are using iwlagn
#
# prints running average of 'Tx aggregation enabled' errors per minute

/Linux version /{ print };
/iwlwifi .* Radio/{					# EDIT #
	sub("\\[",""); sub("]","");
	told=$6; tag=$0; R1=1
};
/wlp3s0: leased/{ print };				# EDIT #

R1==1 && /Tx agg/{
	R1=0; L1=1
};

L1==1 && /Tx agg/{
	sub("\\[",""); sub("]","");
	tnew=$6; tdelta=(tnew-told); told=tnew;
	tot+=tdelta; cnt++; avg=tot/cnt;

	printf "%s avg=%4.1f tot=%6.1f TX agg\n",
	       $3,avg/60,tot/60

	if((cnt % 10)==0){
		system("iwconfig wlp3s0")		# EDIT #
	};
};

L1==1 && /wlp3s0: carrier/{				# EDIT #
	print; L1=0; tdelta=tot=cnt=told=0
};
