# Clubs of Excellence HTL Leonding

### Apply deployment
``kubectl apply -f ./k8s/clubsofexcellence_test.yml``
### Delete deployment
``kubectl delete -n <namespace> deployment clubsofexcellence``
### Genereate env's
``kubectl create secret generic cle --from-env-file=.env.production``
### Delete env's
``kubectl delete secret cle``
### connect to db
``kubectl exec -it <pod name> --  psql -h localhost -U <user> --password -p 5432 leoclubs``