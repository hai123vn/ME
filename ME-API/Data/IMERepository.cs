using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace ME_API.Data
{
    public interface IMERepository<T> where T : class
    {
        T FindById(object id);
        void Add(T entity);
        void Update(T entity);
        void Remove(T entity);
        Task<bool> SaveAll();
        void RemoveMultiple(List<T> entities);
        IQueryable<T> FindAll(params Expression<Func<T, object>>[] includeProperties);
        IQueryable<T> FindAll(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includeProperties);
        void AddMultiple(List<T> entities);
        IQueryable<T> GetAll();
        T FindSingle(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includeProperties);
    }
}