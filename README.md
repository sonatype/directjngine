# directjngine maintenance fork

Fork of https://code.google.com/p/directjngine/ (from zip, since no SCM seems to be available publicly).

The original authors seem to have gone MIA:

http://www.sencha.com/forum/showthread.php?73027-Ext-Direct-Java-based-implementation&p=1087900&viewfull=1#post1087900

# Vendor Branching

The model for updating the upstream bamboo sources is detailed here:

http://happygiraffe.net/blog/2008/02/07/vendor-branches-in-git/

## Update upstream

    git checkout upstream
    rm -r *
    unzip directjngine.X.X.X.zip
    git add .
    git commit -a -m 'directjngine X.X.X'
    git push upstream
    git tag directjngine-X.X.X
    git push origin directjngine-X.X.X

May complain about a lot of line-ending issues.

## Integrate upstream

    git checkout master
    git merge upstream
    git push origin master